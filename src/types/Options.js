// @flow

import type { DateFormat } from 'types/DateFormat';

export interface DefaultOptions {
  from?: DateFormat,
  to?: DateFormat,
  perPage?: number,
  requestAllPages?: boolean,
  markdown?: boolean,
  formatter?: string,
  mergedTag?: string,
  closedTag?: string,
}

export interface Options extends DefaultOptions {
  username: string,
  password?: string,
  token?: string,
}
