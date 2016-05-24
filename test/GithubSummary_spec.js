import assert from 'power-assert';
import GithubSummary from '../src/GithubSummary';

describe('GithubSummary', () => {
  let summary;

  beforeEach(() => {
    summary = new GithubSummary({ username: 'zenoplex' });
  });

  it('should return default options', () => {
    const {
      options: {
        username, password, token, from, to, perPage, requestAllPages, markdown, formatter,
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
    assert(formatter === '{checkbox} {title} - {repo} by {username} {flag}');
  });
});
