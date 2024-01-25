/**
 * @param {Date} instant Last updated timestamp
 * @param {number} counter
 * @param {number} limit Size in units of the bucket, limit to overflow
 * @param {number} rate Units to subtract each _interval_
 * @param {number} interval Interval in milisecods to leak _rate_ units
 */
export class Bucket {
  constructor(
    instant = 0,
    counter = 0,
    limit = 10,
    rate = 10,
    interval = 1_000 * 60
  ) {
    this.instant = typeof instant === 'object' && instant >= 0 ? instant : 0;
    this.counter = typeof counter === 'number' && counter >= 0 ? counter : 0;
    this.limit = typeof limit === 'number' && limit > 0 ? limit : 10;
    this.rate = typeof rate === 'number' && rate > 0 ? rate : 10;
    this.interval =
      typeof interval === 'number' && interval > 0 ? interval : 1_000 * 60;
  }

  ingest() {
    ++this.counter;
  }
  isFull() {
    return this.counter > this.limit;
  }
  /**
   * @param {Date} newInstant
   */
  leak(newInstant) {
    const elapsed = Math.abs(newInstant - this.instant);
    const intervals = elapsed / this.interval;
    if (intervals < 1) {
      return this;
    }
    const leak = intervals * this.rate;
    console.log({elapsed, intervals, leak})
    this.counter -= Math.min(this.counter, leak);
    this.instant = newInstant;
  }
  /**
   * @param {Date} newInstant
   * @returns {boolean}
   */
  shouldStop(newInstant) {
    this.ingest();
    const stop = this.isFull();
    this.leak(newInstant);
    return stop;
  }
}

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function rateLimit(bucket = new Bucket()) {
  return function (req, res, next) {
    console.log(bucket);
    if (bucket.shouldStop(new Date())) {
      return res.status(429).header('Retry-After', 60).send({
        'Retry-After': 60,
        message: 'Too Many Requests',
      });
    }
    console.log(bucket);
    return next();
  };
}
