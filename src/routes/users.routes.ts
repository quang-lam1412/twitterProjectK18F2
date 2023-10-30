import { Router } from 'express'
import { register } from 'module'
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  registerController,
  resendEmailVerifyController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router()

/*
des: đăng nhập
path: /users/login
method: POST
body: {email, password}
*/

usersRouter.get('/login', loginValidator, wrapAsync(loginController))

/*
Description: Resgister new User
Path: /register
Method: POST
body: {
    name: string
    email: string
    password: string
    confirm_pssword: string
    date_of_birth:string theo chuẩn là ISO 8601
}
*/
usersRouter.post('/register', registerValidator, wrapAsync(registerController))

/*

*/ /*
  des: đăng nhập
  path: /users/logout
  method: POST
  Header: {Authorization: Bearer <access_token>}
  body: {refresh_token: string}
  */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(loginController))
/*
 des : verify email
 khi ng dùng đăng ký , trong email của họ sẽ có 1 link 
 trong link này đã setup sẵn 1 reqquest kèm email_verify_token
 thì verify email là cái router cho request đó 
 method: post
 path: /users/verify-email?token=< email_verify_token
 body: {email_verify_token: string}
*/
usersRouter.post('/verify-email', emailVerifyValidator, wrapAsync(emailVerifyController))

/*
des: resend email verify
method: POST
headeers: {Authorization: Bearer <access_token>}
}
 */
usersRouter.post('/resend-email-verify', accessTokenValidator, wrapAsync(resendEmailVerifyController))

/*
des: cung cấp email để reset password, gữi email cho người dùng
path: /forgot-password
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {email: string}
*/
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapAsync(forgotPasswordController))

/*
Đỗ Hậu
des: verify forgot password token
người dùng sau kho báo forgot password, họ sẽ nhận được 1 emial
họ vào và click vào link trong email đó, link đó sẽ có 1 request đings kèm
forgot_password_token và gửi lên server /verify-forgot-password-token
mình sẽ verify cái token này nếu thành công thì mình sẽ cho người reset password
method: POST
path: /users/verify-forgot-password-token
body: {forgot_password_token: string}
*/
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordTokenController)
)
export default usersRouter
