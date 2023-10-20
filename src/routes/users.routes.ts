import { Router } from 'express'
import { register } from 'module'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
const usersRouter = Router()

usersRouter.get('/login', loginValidator, loginController)

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
usersRouter.post('/register', registerValidator, registerController)
export default usersRouter
