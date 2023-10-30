//file này dùng để dịnh nghĩa lại request truyền lên từ client
import { Request } from 'express'
import { TokenPayload } from './models/requests/User.requests'

declare module 'express' {
  interface Request {
    user?: User // trong 1 request có thể có hoặc không user
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
    decoded_forgot_password_token?: TokenPayload
  }
}
