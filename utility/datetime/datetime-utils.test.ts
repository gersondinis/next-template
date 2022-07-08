import {
  createDatetime,
  dateToLocalDatetime,
  convertDurationToServerFormat,
  formattedDurationFromInterval,
  formattedDurationFromObj,
  formatTime,
  formatDate,
  formatDurationWithNoSeconds,
  convertDurationToObject,
  convertServerDurationToLocalFormat,
  sanitizeAndValidateDatetime,
  sanitizeDatetime,
  validateDatetime,
  fromUTC,
  toUTC,
  nowTz,
  GET_CLIENT_TZ,
  Format,
  TimeZone
} from './datetime-utils';


describe('Test datetime utils', () => {
  test('It should be able to get current client timezone ID', () => {
    expect(GET_CLIENT_TZ()).toBe(TimeZone.Azores);
  });

  test('Atlantic/Azores and UTC TimeZone should be the SAME between March 27 and October 31', () => {
    const tz = TimeZone.Azores;
    let datetime = '2021-03-01 12:00:00';
    expect(fromUTC(datetime, tz)).not.toBe('2021-03-01 12:00:00');
    datetime = '2021-04-01 12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-04-01 12:00:00');
    datetime = '2021-10-01 12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-10-01 12:00:00');
    datetime = '2021-11-01 12:00:00';
    expect(fromUTC(datetime, tz)).not.toBe('2021-11-01 12:00:00');
  });

  test('Europe/Lisbon and UTC TimeZone should be DIFFERENT between March 27 and October 31', () => {
    const tz = TimeZone.Lisbon;
    let datetime = '2021-03-01 12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-03-01 12:00:00');
    datetime = '2021-04-01 12:00:00';
    expect(fromUTC(datetime, tz)).not.toBe('2021-04-01 12:00:00');
    datetime = '2021-10-01 12:00:00';
    expect(fromUTC(datetime, tz)).not.toBe('2021-10-01 12:00:00');
    datetime = '2021-11-01 12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-11-01 12:00:00');
    datetime = '2021-11-01 12:';
    expect(() => fromUTC(datetime, tz)).toThrow();
  });

  test('It should accept T format', () => {
    const tz = TimeZone.Lisbon;
    let datetime = '2021-03-01T12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-03-01 12:00:00');
    datetime = '2021-03-01t12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-03-01 12:00:00');
  });

  test('It should convert from a specific timezone to UTC', () => {
    const tz = TimeZone.Azores;
    let datetime = '2021-10-01 12:00:00';
    expect(toUTC(datetime, tz)).toBe('2021-10-01 12:00:00');
    datetime = '2021-11-01 12:00:00';
    expect(toUTC(datetime, tz)).not.toBe('2021-11-01 12:00:00');
  });

  test('It should convert from UTC to America/New_York and vice versa', () => {
    const tz = TimeZone.NewYork;
    let datetime = '2021-10-01 12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-10-01 08:00:00');
    datetime = '2021-12-01 12:00:00';
    expect(fromUTC(datetime, tz)).toBe('2021-12-01 07:00:00');
  });

  test('It should convert Date instance to format yyyy-mm-dd hh:mm:ss', () => {
    const date = new Date('2021-10-01 12:00:00');
    expect(dateToLocalDatetime(date)).toBe('2021-10-01 12:00:00');
  });

  test('It should get current datetime on a specific timezone', () => {
    expect(nowTz()).toBe(dateToLocalDatetime(new Date()));
  });

  test('It should format local datetime into local time format', () => {
    expect(formatTime('2022-01-05 12:56:23')).toBe('12:56:23');
    expect(formatTime('2022-01-05 12:56:23', true)).toBe('12:56');
    expect(formatTime('2022-01-05', true)).toBe('');
    expect(formatTime('')).toBe('');
  });

  test('It should format local datetime into local date format', () => {
    expect(formatDate('2022-01-05 12:56:23')).toBe('2022-01-05');
    expect(formatDate('2022-01-05')).toBe('2022-01-05');
    expect(formatDate('')).toBe('');
  });

  test('It should format local duration with no seconds format', () => {
    expect(formatDurationWithNoSeconds('12:56:23')).toBe('12:56');
    expect(formatDurationWithNoSeconds('12:56:120')).toBe('12:58');
    expect(formatDurationWithNoSeconds('12:56:119')).toBe('12:57');
  });

  test('It should sanitize a datetime string', () => {
    expect(sanitizeDatetime('2021-08-20T14:30:20+0000')).toBe('2021-08-20 14:30:20');
    expect(sanitizeDatetime('2021-08-20T14:30:20')).toBe('2021-08-20 14:30:20');
    expect(sanitizeDatetime('2021-08-20T14:30')).toBe('2021-08-20 14:30');
    expect(sanitizeDatetime('2021-08-20T14')).toBe('2021-08-20 14');
    expect(sanitizeDatetime('2021-08-20 14')).toBe('2021-08-20 14');
  });

  test('It should validate a datetime string', () => {
    expect(validateDatetime('2021-08-20T14:30:20+0000')).toBeTruthy();
    expect(validateDatetime('2021-08-20 14:30:20')).toBeTruthy();
    expect(validateDatetime('2021-08-20 14:30')).toBeFalsy();
    expect(validateDatetime('2021-08-20 14:30', 'yyyy-MM-dd HH:mm')).toBeTruthy();
    expect(validateDatetime('2021-08-20 14:')).toBeFalsy();
    expect(validateDatetime('2021-08-20 14', 'yyyy-MM-dd HH')).toBeTruthy();
    expect(validateDatetime('2021-08-20 1')).toBeFalsy();
    expect(validateDatetime('2021-08-20')).toBeTruthy();
  });

  test('It should sanitize and validate a datetime string', () => {
    expect(sanitizeAndValidateDatetime('2021-08-20T14:30:20+0000')).toBeTruthy();
    expect(sanitizeAndValidateDatetime('2021-08-20 14:30:20')).toBeTruthy();
    expect(() => sanitizeAndValidateDatetime('2021-08-20 14:30')).toThrow();
    expect(sanitizeAndValidateDatetime('2021-08-20 14:30', 'yyyy-MM-dd HH:mm')).toBeTruthy();
    expect(() => sanitizeAndValidateDatetime('2021-08-20 14:')).toThrow();
    expect(sanitizeAndValidateDatetime('2021-08-20 14', 'yyyy-MM-dd HH')).toBeTruthy();
    expect(() => sanitizeAndValidateDatetime('2021-08-20 1')).toThrow();
    expect(sanitizeAndValidateDatetime('2021-08-20')).toBeTruthy();
  });

  test('It should format a duration from an object {hours: 2, minutes: 40, seconds: 15} into "02:40:15" format', () => {
    expect(formattedDurationFromObj({hours: 2, minutes: 40, seconds: 15})).toBe('02:40:15');
    expect(formattedDurationFromObj({hours: 2, minutes: 40, seconds: 15}, Format.DURATION_FORMAT_NO_SEC)).toBe('02:40');
    expect(formattedDurationFromObj({hours: 2, minutes: 40, seconds: 61})).toBe('02:41:01');
    expect(formattedDurationFromObj({hours: 15, minutes: 61, seconds: 60})).toBe('16:02:00');
    expect(formattedDurationFromObj({hours: 15, minutes: 61})).toBe('16:01:00');
    expect(formattedDurationFromObj({hours: 15})).toBe('15:00:00');
    expect(formattedDurationFromObj({minutes: 20})).toBe('00:20:00');
    expect(formattedDurationFromObj({seconds: 20})).toBe('00:00:20');
    expect(formattedDurationFromObj({})).toBe('00:00:00');
  });

  test('It should convert duration to object {hours: 2, minutes: 40, seconds: 15}', () => {
    expect(convertDurationToObject('2')).toEqual(expect.objectContaining({hours: 2, minutes: 0, seconds: 0}));
    expect(convertDurationToObject('02')).toEqual(expect.objectContaining({hours: 2, minutes: 0, seconds: 0}));
    expect(convertDurationToObject('00:05')).toEqual(expect.objectContaining({hours: 0, minutes: 5, seconds: 0}));
    expect(convertDurationToObject('02:40')).toEqual(expect.objectContaining({hours: 2, minutes: 40, seconds: 0}));
    expect(convertDurationToObject('02:40:30')).toEqual(expect.objectContaining({hours: 2, minutes: 40, seconds: 30}));
    expect(convertDurationToObject('02:40:60')).toEqual(expect.objectContaining({hours: 2, minutes: 40, seconds: 60}));
    expect(convertDurationToObject('26:72:65')).toEqual(expect.objectContaining({hours: 26, minutes: 72, seconds: 65}));
    expect(convertDurationToObject('26:72:65')).toEqual({hours: 26, minutes: 72, seconds: 65});
  });

  test('It should format a duration from an interval of two datetime into "02:40:15" format', () => {
    expect(formattedDurationFromInterval('2021-05-01 16:40:15', '2021-05-01 16:40:15')).toBe('00:00:00');
    expect(formattedDurationFromInterval('2021-05-01 14:00:00', '2021-05-01 16:40:15')).toBe('02:40:15');
    expect(formattedDurationFromInterval('2021-05-01 14:00:00', '2021-05-02 16:00:00')).toBe('26:00:00');
    expect(formattedDurationFromInterval('2021-05-01 16:40:15', '2021-05-01 14:00:00')).toBe('Invalid Duration');
  });

  test('It should create a luxon datetime instance', () => {
    expect(createDatetime('2021-05-01 14:00:00').toFormat(Format.DATE_FORMAT)).toBe('2021-05-01');
    expect(createDatetime('2021-05-01 14:00:00').toFormat(Format.DATETIME_FORMAT)).toBe('2021-05-01 14:00:00');
    expect(createDatetime('2021-05-01 14:00:00').toFormat(Format.TIME_FORMAT)).toBe('14:00:00');
    expect(createDatetime('2021-05-01 14:00:00').toFormat(Format.TIME_FORMAT_NO_SEC)).toBe('14:00');
    expect(createDatetime('2021-05-01 14:00:00').equals(createDatetime('2021-05-01 14:00:00'))).toBeTruthy();
    expect(createDatetime('2021-05-01 14:00:00') >= createDatetime('2021-05-01 14:00:00')).toBeTruthy();
    expect(createDatetime('2021-05-01 14:00:00') <= createDatetime('2021-05-01 14:00:00')).toBeTruthy();
    expect(createDatetime('2021-05-01 14:00:00') < createDatetime('2021-05-01 14:00:01')).toBeTruthy();
    expect(createDatetime('2021-05-01 14:00:02') > createDatetime('2021-05-01 14:00:01')).toBeTruthy();
  });

  test('It should convert local duration into server duration format.', () => {
    expect(convertDurationToServerFormat('00:00:00')).toBe('PT0H0M');
    expect(convertDurationToServerFormat('00:05:00')).toBe('PT0H5M');
    expect(convertDurationToServerFormat('14:00:00')).toBe('PT14H0M');
    expect(convertDurationToServerFormat('07:30:00')).toBe('PT7H30M');
    expect(convertDurationToServerFormat('27:61:00')).toBe('PT28H1M');
    expect(convertDurationToServerFormat('27:50:120')).toBe('PT27H52M');
    expect(convertDurationToServerFormat('27:50:119')).toBe('PT27H51M');
  });

  test('It should convert server duration into local duration format.', () => {
    expect(convertServerDurationToLocalFormat('PTHM')).toBe('00:00:00');
    expect(convertServerDurationToLocalFormat('PTH0M')).toBe('00:00:00');
    expect(convertServerDurationToLocalFormat('PT0H0M')).toBe('00:00:00');
    expect(convertServerDurationToLocalFormat('PT0H5M')).toBe('00:05:00');
    expect(convertServerDurationToLocalFormat('PT14H0M')).toBe('14:00:00');
    expect(convertServerDurationToLocalFormat('PT7H30M')).toBe('07:30:00');
    expect(convertServerDurationToLocalFormat('PT28H1M')).toBe('28:01:00');
    expect(convertServerDurationToLocalFormat('PT27H52M')).toBe('27:52:00');
    expect(convertServerDurationToLocalFormat('PT27H51M')).toBe('27:51:00');
    expect(convertServerDurationToLocalFormat('')).toBe('00:00:00');
  });
});
