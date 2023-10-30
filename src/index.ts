import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const app = express()

const PORT = 3000
databaseService.connect()
app.use(express.json())
//localhost: 3000/
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/users', usersRouter)
//localhost:3000/users/tweets

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.log('error handler tổng nè')
  res.status(400).json({ message: err.message })
})
//app sử dụng một error handler tổng
app.use(defaultErrorHandler)
app.listen(PORT, () => {
  console.log(`Server đang chạy trên post ${PORT}`)
})
