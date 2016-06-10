import assert from 'power-assert';
import { getStartOfDay, getEndOfDay } from '../../src/utils/date';

describe('getStartOfDay', () => {
  let date;
  let cDate;

  beforeEach(() => {
    date = new Date();
    cDate = new Date();
  });

  it('should return beginning of today', () => {
    date.setHours(0, 0, 0, 0);
    assert(getStartOfDay().getTime() === date.getTime());
  });

  it('should return beginning of specified day', () => {
    date = new Date('2016/1/1 10:0:19:999');
    cDate = new Date('2016/1/1 0:0:0:000');

    assert(getStartOfDay(date).getTime() === cDate.getTime());
  });
});

describe('getEndOfDay', () => {
  let date;
  let cDate;

  beforeEach(() => {
    date = new Date();
    cDate = new Date();
  });

  it('should return end of today', () => {
    date.setHours(23, 59, 59, 999);
    assert(getEndOfDay().getTime() === date.getTime());
  });

  it('should return end of specified day', () => {
    date = new Date('2016/1/1 10:0:19:345');
    cDate = new Date('2016/1/1 23:59:59:999');

    assert(getEndOfDay(date).getTime() === cDate.getTime());
  });
});
