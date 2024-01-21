import { Router, Request, Response, NextFunction } from 'express'
const router = Router()

const rateLimitBucket = {
  counter: 0,
  limit: 10,
  rate: 10,
  instant: 0,
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function rateLimit(req, res, next) {
  const instant = new Date()
  /** @type {Date} */
  const elapsed = Math.abs(instant - rateLimitBucket.instant) / (1000 * 60)
  rateLimitBucket.counter += 1 - elapsed * rateLimitBucket.rate
  if (rateLimitBucket.counter > rateLimitBucket.limit) {
    res.status(429).header('Retry-After', 60).send({})
  }
  next()
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

export default router
