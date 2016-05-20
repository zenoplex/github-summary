# GithubSummary

[![wercker status](https://app.wercker.com/status/600638ff8906a97fbd7eb3e8d29cdbc4/s "wercker status")](https://app.wercker.com/project/bykey/600638ff8906a97fbd7eb3e8d29cdbc4)

Node version of [github-nippou](https://github.com/masutaka/github-nippou) gem.

This package will retrieve unique github issue and pull request activities for a given date range.

## Getting Started

```bash
npm i github-summary -g
```

## Usage

Retrieve given `username`s' events for public repositories

```js
var GithubSummary = require('github-summary');
var summary = new GithubSummary({
  username: 'github username'
});
summary.getSummary()
  .then(function(markdown) {
    console.log(markdown);
  });
```

Retrieve given `username`s' events for public/private repositories

```js
// use username and password
var GithubSummary = require('github-summary');
var summary = new GithubSummary({
  username: 'github username',
  password: 'some_login_password'
});

// or Token if you like
var summary = new GithubSummary({
  username: 'github username',
  token: 'some_access_token',
});
```
## Instance methods

* getSummary()

## Options

**GithubSummary(options)**

```js
{
  // username is required
  username:        'github username',
  // either password or token is required to access events in private repositories
  password:        'some_login_password',
  token:           'some_access_token',

  // set starting date. Defaults to yesturday (`date.setDate(-1)`)
  from:            '2015/12/12',

  // set end date. Defaults to today
  to:              '2015/12/24',

  // number of events to retrieve per request to github. Default maxed to `100`
  perPage:         100,

  // setting true will reteive all possible user event pages. Default: `false`
  requestAllPages: false,

  // setting false will return html instead of github favored markdown. Default: `true`
  markdown:        true,
}
```
