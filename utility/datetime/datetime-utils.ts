import {DateTime, Duration, Interval} from 'luxon';

export interface DurationObject {
  years?: number;
  quarters?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export type LocalDate = string; // - ex. "2022-01-06"
export type LocalDatetime = string; // - ex. "2022-01-06 07:15:00"
export type UnsanitizedDatetime = string; // - ex. "2021-10-03T12:00:00+00:00"
export type LocalTime = string; // - ex. "07:40:00"
export type LocalDuration = string; // - ex. "26:62:00"
export type ServerDuration = string; // - ex. "PT2H3M"
export type FlightId = string; // - ex. "220106S42280BOS"

export enum Format {
  DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss',
  DATETIME_FORMAT_NO_SEC = 'yyyy-MM-dd HH:mm',
  DATE_FORMAT = 'yyyy-MM-dd',
  TIME_FORMAT = 'HH:mm:ss',
  TIME_FORMAT_NO_SEC = 'HH:mm',
  DURATION_FORMAT = 'hh:mm:ss',
  DURATION_FORMAT_NO_SEC = 'hh:mm'
}

export enum TimeZone {
  UTC = 'UTC',
  Azores = 'Atlantic/Azores',
  Lisbon = 'Europe/Lisbon',
  NewYork = 'America/New_York'
}

/**
 * Formats provided datetime as time
 * @param {LocalDatetime} datetime - Ex. '2021-10-03 12:00:00'
 * @param {boolean} [noSeconds]
 * @return {LocalTime | null} - Ex. '12:00:00' or '12:00'
 */
export const formatTime = (datetime: LocalDatetime, noSeconds = false): LocalTime | null => {
  return datetime?.substring(11, noSeconds ? 16 : 19);
};

/**
 * Formats provided datetime as date
 * @param {LocalDatetime} datetime - Ex. '2021-10-03 12:00:00'
 * @return {LocalDate | null} - Ex. '2021-10-03'
 */
export const formatDate = (datetime: LocalDatetime): LocalDate | null => {
  return datetime?.substring(0, 10);
};

/**
 * Formats provided duration as duration with no seconds
 * @param {LocalDuration} duration - Ex. '27:62:120'
 * @return {LocalDuration | null} - Ex. '27:64'
 */
export const formatDurationWithNoSeconds = (duration: LocalDuration): LocalDuration => {
  return createDuration(duration).toFormat(Format.DURATION_FORMAT_NO_SEC);
};

/**
 * Current timezone (Ex. 'Atlantic/Azores')
 * @type {function: TimeZone}
 */
export const GET_CURRENT_TZ = () => TimeZone.Azores;

/**
 * Current timezone (Ex. 'Atlantic/Azores')
 * @type {function: TimeZone}
 */
export const GET_CLIENT_TZ = (): TimeZone => DateTime.now().zoneName as TimeZone;

/**
 * Sanitizes the provided datetime
 * @param {string} datetime - Ex. '2021-10-03T12:00:00+00:00'
 * @return {LocalDatetime | never} - Ex. '2021-10-03 12:00:00'
 */
export const sanitizeDatetime = (datetime: string): LocalDatetime => {
  if (typeof datetime !== 'string') throw new Error('sanitizeDatetime: provided datetime should be of type string.');
  return datetime.toUpperCase().substring(0, 19).replace('T', ' ');
};

/**
 * Creates a luxon datetime instance from datetime string
 * @param {string} datetime - Ex. '2021-10-03 12:00:00'
 * @param {string?} format - Ex. 'yyyy-MM-dd HH:mm:ss'
 * @return {DateTime}
 */
export const createDatetime = (datetime: string, format: string | undefined = undefined): DateTime => {
  const f = format || (datetime?.length > 10 ? Format.DATETIME_FORMAT : Format.DATE_FORMAT);
  return DateTime.fromFormat(sanitizeDatetime(datetime), format || f);
};

/**
 * Validates the provided datetime if it is a valid date / datetime
 * @param {string} datetime - Ex. '2021-10-03T12:00:00+00:00'
 * @param {string?} format - Ex. 'yyyy-MM-dd HH:mm:ss'
 * @return {boolean}
 */
export const validateDatetime = (datetime: string, format: string | undefined = undefined): boolean => {
  return createDatetime(datetime, format).isValid;
};

/**
 * Sanitizes Validates the provided datetime if it is a valid date / datetime
 * @param {string} datetime - Ex. '2021-10-03T12:00:00+00:00'
 * @param {string?} format - Ex. 'yyyy-MM-dd HH:mm:ss'
 * @return {LocalDatetime} - Ex. '2021-10-03 12:00:00'
 */
export const sanitizeAndValidateDatetime = (datetime: string, format: string | undefined = undefined): LocalDatetime => {
  const sanitizedDatetime = sanitizeDatetime(datetime);
  if (!validateDatetime(sanitizedDatetime, format)) throw new Error('Invalid datetime provided.');
  return sanitizedDatetime;
};

/**
 * Convert timezone
 * @param {string} datetime - Ex. '2021-10-03 12:00:00'
 * @param {string} fromTz - Ex. 'Atlantic/Azores'
 * @param {string} toTz - Ex. 'Atlantic/Azores'
 * @param {string} format - Ex. 'yyyy-MM-dd HH:mm:ss'
 * @returns {LocalDatetime} - Ex. '2021-10-03 12:00:00'
 */
export const convertTz = (datetime: LocalDatetime, fromTz: TimeZone, toTz: TimeZone, format = Format.DATETIME_FORMAT): LocalDatetime => {
  return DateTime.fromFormat(sanitizeAndValidateDatetime(datetime), format, {zone: fromTz})
    .setZone(toTz)
    .toFormat(format);
};

/**
 * Convert from UTC
 * @param {string} datetime - Ex. '2021-10-03 12:00:00'
 * @param {string} tz - Ex. 'Atlantic/Azores'
 * @param {string} format - Ex. 'yyyy-MM-dd HH:mm:ss'
 * @returns {LocalDatetime} - Ex. '2021-10-03 12:00:00'
 */
export const fromUTC = (datetime: LocalDatetime, tz = GET_CURRENT_TZ(), format = Format.DATETIME_FORMAT): LocalDatetime => {
  return convertTz(datetime, TimeZone.UTC, tz, format);
};

/**
 * Convert to UTC
 * @param {string} datetime - Ex. '2021-10-03 12:00:00'
 * @param {string} tz - Ex. 'Atlantic/Azores'
 * @param {string} format - Ex. 'yyyy-MM-dd HH:mm:ss'
 * @returns {LocalDatetime} - Ex. '2021-10-03 12:00:00'
 */
export const toUTC = (datetime: LocalDatetime, tz = GET_CURRENT_TZ(), format = Format.DATETIME_FORMAT): LocalDatetime => {
  return convertTz(datetime, tz, TimeZone.UTC, format);
};

/**
 * Get current date time on the provided timezone
 * @param {string} tz - Ex. 'Atlantic/Azores'
 * @param {string} format - Ex. 'yyyy-MM-dd HH:mm:ss'
 * @returns {LocalDatetime} - Ex. '2021-10-03 12:00:00'
 */
export const nowTz = (tz = GET_CURRENT_TZ(), format = Format.DATETIME_FORMAT): LocalDatetime => DateTime.now().setZone(tz).toFormat(format);

/**
 * Formats Date instance into 'yyyy-MM-dd HH:mm:ss' format.
 * @param {Date} d
 * @returns {LocalDatetime}
 */
export const dateToLocalDatetime = (d: Date): LocalDatetime =>
  [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-') +
  ' ' +
  [
    String(d.getHours()).padStart(2, '0'),
    String(d.getMinutes()).padStart(2, '0'),
    String(d.getSeconds()).padStart(2, '0')
  ].join(':');

// DURATIONS
/**
 * Creates a luxon duration instance from local duration
 * @param {LocalDuration} duration - Ex. '27:23:00'
 * @return {Duration}
 */
export const createDuration = (duration: LocalDuration): Duration => {
  return Duration.fromObject(convertDurationToObject(duration));
};

/**
 * Formats duration into a time format.
 * @param {DurationObject} duration - Ex. {hours: 2, minutes: 32, seconds: 43}
 * @param {string} format - Ex. 'hh:mm:ss'
 * @return {LocalDuration} - Ex. '02:32:43'
 */
export const formattedDurationFromObj = (duration: DurationObject, format = Format.DURATION_FORMAT): LocalDuration => {
  return Duration.fromObject(duration).toFormat(format);
};

/**
 * Convert duration into a duration object.
 * @param {LocalDuration} duration - Ex. "02:32:43"
 * @return {DurationObject} - Ex. {hours: 2, minutes: 32, seconds: 43}
 */
export const convertDurationToObject = (duration: LocalDuration): DurationObject => {
  const [hours = '0', minutes = '0', seconds = '0'] = duration.split(':');
  return {hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds)};
};

/**
 * Formats two dates interval into a formatted duration.
 * @param {string} start - Ex. '2021-10-03 12:00:00'
 * @param {string} end - Ex. '2021-10-03 13:40:15'
 * @param {string} format - Ex. 'hh:mm:ss'
 * @return {LocalDuration} - Ex. '01:40:15'
 */
export const formattedDurationFromInterval = (start: LocalDatetime, end: LocalDatetime, format = Format.DURATION_FORMAT): LocalDuration => {
  return Interval.fromDateTimes(
    DateTime.fromFormat(sanitizeAndValidateDatetime(start), Format.DATETIME_FORMAT),
    DateTime.fromFormat(sanitizeAndValidateDatetime(end), Format.DATETIME_FORMAT)
  )
    .toDuration()
    .toFormat(format);
};

/**
 * Convert local duration into server duration format.
 * @param {LocalDuration} duration - Ex. '12:00:00'
 * @return {ServerDuration} - Ex. 'PT1H40M'
 */
export const convertDurationToServerFormat = (duration: LocalDuration): ServerDuration => {
  const [hStr = '0', mStr = '0', sStr = '0'] = duration.split(':');
  const [fhStr, fmStr] = formattedDurationFromObj({
    hours: parseInt(hStr),
    minutes: parseInt(mStr),
    seconds: parseInt(sStr)
  }).split(':');
  return `PT${parseInt(fhStr)}H${parseInt(fmStr)}M`;
};

/**
 * Convert server duration into local duration format.
 * @param {ServerDuration} serverDuration - Ex. 'PT1H40M'
 * @return LocalDuration
 */
export const convertServerDurationToLocalFormat = (serverDuration: ServerDuration): LocalDuration => {
  const [hours, minutes] = serverDuration.replace('PT', '').replace('M', '').split('H');
  return formattedDurationFromObj({hours: parseInt(hours || '0'), minutes: parseInt(minutes || '0')});
};
