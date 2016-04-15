import 'babel-polyfill';
import Github from 'github-api';

const username = 'zenoplex';
const github = new Github({
  token: '',
  auth:  'oauth',
});

const user = github.getUser();
user.show(username, (...props) => {
  console.log(props);
});

const issues = github.getIssues(username);
issues.list({}, (...props) => {
  console.log(props);
});
