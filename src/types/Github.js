// @flow

export type Event = {
  repo: Object,
  payload: Object,
  type: string,
}

export type Repo = {
  name: string,
}

export type User = {
  html_url: string,
  login: string,
  avatar_url: string,
}

interface PayloadBase {
  title: string,
  user: User,
  html_url: string,
}

export interface IssuePayload extends PayloadBase {
  state: string,
}

export interface PullRequestPayload extends PayloadBase {
  merged: boolean,
}

export type Payload = IssuePayload & PullRequestPayload;
