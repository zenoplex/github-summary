import drop from 'lodash/drop';
import uniqBy from 'lodash/uniqBy';
import axios from 'axios';
import parseLinkHeader from 'parse-link-header';
import toMarkdown from 'to-markdown';
import { Buffer } from 'buffer/';
import {
  ISSUE_EVENT, ISSUE_COMMENT_EVENT, PULL_REQUEST_EVENT, PULL_REQUEST_REVIEW_COMMENT_EVENT,
  CLOSED,
} from './constants';

export default class GithubSummary {
  constructor(options) {
    this.options = { ...GithubSummary.defaults, ...options };

    if (!options.username) throw new Error('options.username is required');

    this.init();
  }

  init() {
    const auth = this.getAuth();

    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: auth ? { Authorization: auth } : {},
      params:  {
        per_page: this.options.perPage,
      },
    });
  }

  getAuth() {
    const { username, password, token } = this.options;

    if (token) return `token ${token}`;
    else if (username && password) {
      return `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`;
    }

    return null;
  }

  getEvents(page = 1) {
    return this.api.get(`/users/${this.options.username}/events`, { params: { page } });
  }

  requestEvents() {
    return this.getEvents()
      .then(response => {
        const { requestAllPages } = this.options;
        const pagination = parseLinkHeader(response.headers.link);
        let requests = [];

        if (requestAllPages && pagination) {
          requests = drop([...Array(Number(pagination.last.page)).keys()]).map(page => {
            let i = page;
            return this.getEvents(++i);
          });
        }

        return axios.all([response, ...requests])
          .then(responses => responses.reduce((prev, current) =>
            prev.concat(current.data), []));
      })
      ;
  }

  formatRepo(repo) {
    const { name, url } = repo;
    return `<a href="${url}">${name}</a>`;
  }

  formatIssueTitle(payload) {
    const { title, html_url } = payload;
    return `<a href="${html_url}">${title}</a>`;
  }

  formatUser(user) {
    const { html_url, login } = user;
    return `<a href="${html_url}">${login}</a>`;
  }

  formatFlag(payload) {
    const { mergedTag, closedTag } = this.options;
    const { merged, state } = payload;

    if (merged) return mergedTag;
    else if (state === CLOSED) return closedTag;

    return '';
  }

  formatCheckbox(payload) {
    const flag = this.formatFlag(payload);
    if (flag) return '<input type="checkbox" checked />';
    return '<input type="checkbox" />';
  }

  format(repo, payload) {
    const { options } = this;
    const { user } = payload;
    const regExp = /{(username|repo|title|checkbox|flag)}/g;
    const templates = {
      '{repo}':     this.formatRepo(repo),
      '{username}': this.formatUser(user),
      '{title}':    this.formatIssueTitle(payload),
      '{checkbox}': this.formatCheckbox(payload),
      '{flag}':     this.formatFlag(payload),
    };

    return options.formatter.replace(regExp, (match) => {
      if (match in templates) {
        return templates[match];
      }
      return null;
    });
  }

  formatEvent(event) {
    switch (event.type) {
      case ISSUE_COMMENT_EVENT:
      case ISSUE_EVENT:
        return this.format(event.repo, event.payload.issue);
      case PULL_REQUEST_REVIEW_COMMENT_EVENT:
      case PULL_REQUEST_EVENT :
        return this.format(event.repo, event.payload.pull_request);
      default:
        return null;
    }
  }

  getSummary() {
    return this.requestEvents()
      .then(events => {
        const { markdown } = this.options;
        const filtered = events
          .filter(event =>
          event.type === ISSUE_EVENT ||
          event.type === ISSUE_COMMENT_EVENT ||
          event.type === PULL_REQUEST_EVENT ||
          event.type === PULL_REQUEST_REVIEW_COMMENT_EVENT)
          .filter(event => {
            const { from, to } = this.options;
            const time = Date.parse(event.created_at);
            return (new Date(from).getTime() < time && new Date(to).getTime() > time);
          });
        // filter by unique html_url
        const unique = uniqBy(filtered, (item) => {
          const { pull_request, issue } = item.payload;
          if (pull_request) return pull_request.html_url;
          else if (issue) return issue.html_url;

          return null;
        });

        const formatted = unique.map(event => `<li>${this.formatEvent(event)}</li>`);
        const list = `<ul>${formatted}</ul>`;

        return markdown ? toMarkdown(list, { gfm: true }) : list;
      });
  }
}

const yesturday = (() => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
})();

const today = (() => {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date;
})();

GithubSummary.defaults = {
  username:        null,
  password:        null,
  token:           null,
  from:            yesturday,
  to:              today,
  perPage:         100,
  requestAllPages: false,
  markdown:        true,
  formatter:       '{checkbox} {title} - {repo} by {username} {flag}',
  mergedTag:       '<strong>merged</strong>',
  closedTag:       '<strong>closed</strong>',
};
