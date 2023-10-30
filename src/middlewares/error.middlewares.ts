import HTTP_STATUS from '~/constants/httpStatus'

import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import { ErrorWithStatus } from '~/models/Errors'

//trong err thì có status và message
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }
  //nếu lỗi xuống đc đây
  //set name, stack, message về enumarable true
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfor: omit(err, ['stack'])
  })
}
