// @flow

type SupportedDateFormat = string | Date | number;

export interface DefaultOptions {
  from?: SupportedDateFormat,
  to?: SupportedDateFormat,
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
