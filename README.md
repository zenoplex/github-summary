# GithubSummary

[![Build Status](https://travis-ci.org/zenoplex/github-summary.svg?branch=master)](https://travis-ci.org/zenoplex/github-summary)

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

  // set starting date. Defaults to beginning of today
  from:            '2015/12/12',

  // set end date. Defaults to end of today
  to:              '2015/12/24',

  // number of events to retrieve per request to github. Default maxed to `100`
  perPage:         100,

  // setting true will reteive all possible user event pages. Default: `false`
  requestAllPages: false,

  // setting false will return html instead of github favored markdown. Default: `true`
  markdown:        true,

  // fomatter string for output
  formatter:       '{checkbox} {flag} {title} {repo} {username} {avatar}',

  // tag for merged issue or pull request
  mergedTag:       '<strong>merged</strong>',

  // tag for closed issue or pull request
  closedTag:       '<strong>closed</strong>',
}
```
