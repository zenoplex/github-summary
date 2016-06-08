import assert from 'power-assert';
import GithubSummary from '../src/GithubSummary';
import event from './json/pullRequestEvent.json';

describe('GithubSummary', () => {
  let summary;

  beforeEach(() => {
    summary = new GithubSummary({ username: 'zenoplex' });
  });

  it('should return default options', () => {
    const {
      options: {
        username, password, token, from, to, perPage, requestAllPages, markdown, formatter,
        mergedTag, closedTag,
      },
    } = summary;

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const yesturday = new Date();
    yesturday.setDate(yesturday.getDate() - 1);
    yesturday.setHours(0, 0, 0, 0);

    assert(username === 'zenoplex');
    assert(password === null);
    assert(token === null);
    assert.deepEqual(from, yesturday);
    assert.deepEqual(to, today);
    assert(perPage === 100);
    assert(requestAllPages === false);
    assert(markdown);
    assert(formatter === '{checkbox} {avatar} <strong>{title}</strong>');
    assert(mergedTag === '<strong>merged</strong>');
    assert(closedTag === '<strong>closed</strong>');
  });

  it('should return authorization header with password', () => {
    summary = new GithubSummary({ username: 'zenoplex', password: 'github_login_password' });
    assert(summary.getAuth() === 'Basic emVub3BsZXg6Z2l0aHViX2xvZ2luX3Bhc3N3b3Jk');
  });

  it('should return authorizaiton header with token', () => {
    summary = new GithubSummary({ username: 'zenoplex', token: 'github_auth_token' });
    assert(summary.getAuth() === 'token github_auth_token');
  });

  it('should format repo', () => {
    const { repo } = event;
    assert(summary.formatRepo(repo) === 'octocat/Hello-World');
  });

  it('should format username', () => {
    const { payload: { pull_request: { user } } } = event;
    assert(summary.formatUser(user) === '<a href="https://github.com/baxterthehacker">baxterthehacker</a>');
  });

  it('should format issue title', () => {
    const { payload: { pull_request } } = event;
    assert(summary.formatIssueTitle(pull_request) === '<a href="https://github.com/baxterthehacker/public-repo/pull/1">Update the README with new information</a>');
  });

  it('should output flag', () => {
    const { payload: { pull_request } } = event;

    assert(summary.formatFlag(pull_request) === '');
    assert(summary.formatFlag({ merged: true }) === '<strong>merged</strong>');
    assert(summary.formatFlag({ state: 'closed' }) === '<strong>closed</strong>');
  });

  it('should output checkbox', () => {
    const { payload: { pull_request } } = event;

    assert(summary.formatCheckbox(pull_request) === '<input type="checkbox" />');
    assert(summary.formatCheckbox({ merged: true }) === '<input type="checkbox" checked />');
    assert(summary.formatCheckbox({ state: 'closed' }) === '<input type="checkbox" checked />');
  });

  it('should format user avatar', () => {
    const { payload: { pull_request: { user } } } = event;
    assert(summary.formatUserAvatar(user) === '<img src="https://avatars.githubusercontent.com/u/6752317?v=3&s=18" alt="baxterthehacker" />');
  });

  it('should format event', () => {
    assert(summary.formatEvent(event) === '<input type="checkbox" /> <img src="https://avatars.githubusercontent.com/u/6752317?v=3&s=18" alt="baxterthehacker" /> <strong><a href="https://github.com/baxterthehacker/public-repo/pull/1">Update the README with new information</a></strong>');
  });
});
