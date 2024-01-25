import { Router, Request, Response, NextFunction } from 'express';
export const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
