import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { notFoundMiddleware } from './middleware/not-found.js'
import { errorHandlerMiddleware } from './middleware/error-handler.js'
import connectDB from './db/connect.js'
import authRouter from './routes/auth.js'
import todosRouter from './routes/todo.js'
import userRouter from './routes/user.js'
import cors from 'cors'
import { authMiddleware } from './middleware/authorization.js'
import rateLimit from 'express-rate-limit'
import expressMongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
const app = express()

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI
if (!uri) {
	throw new Error('MONGO_URI is not defined')
}

app.set('trust proxy', 1)

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})

const sanitizeMongoInput = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	if (req.body) {
		expressMongoSanitize.sanitize(req.body)
	}

	next()
}

const corsOptions = {
	origin: process.env.ClIENT_URL,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
}

app.use(apiLimiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(helmet())
app.use(sanitizeMongoInput)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/todos', authMiddleware, todosRouter)
app.use('/api/v1/user', authMiddleware, userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
	try {
		await connectDB(uri)
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`)
		})
	} catch (error) {
		console.error(error)
	}
}

start()
