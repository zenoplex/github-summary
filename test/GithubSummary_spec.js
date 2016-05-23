import assert from 'power-assert';
import GithubSummary from '../src/GithubSummary';
import dateformat from 'dateformat';

describe('GithubSummary', () => {
  let summary;

  beforeEach(() => {
    summary = new GithubSummary({ username: 'zenoplex' });
  });

  it('should return default options', () => {
    const {
      options: {
        username, password, token, from, to, perPage, requestAllPages, markdown,
      },
    } = summary;

    const today = new Date();
    const yesturday = new Date();
    yesturday.setDate(yesturday.getDate() - 1);

    assert(username === 'zenoplex');
    assert(password === null);
    assert(token === null);
    assert(from === dateformat(yesturday, 'yyyy/mm/dd'));
    assert(to === dateformat(today, 'yyyy/mm/dd'));
    assert(perPage === 100);
    assert(requestAllPages === false);
    assert(markdown);
  });
});
