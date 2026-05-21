import express from 'express'
import 'dotenv/config'
import { notFoundMiddleware } from './middleware/not-found.js'
import { errorHandlerMiddleware } from './middleware/error-handler.js'
const app = express()

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI
if (!uri) {
	throw new Error('MONGO_URI is not defined')
}

app.use(express.json())

app.get('/', (req, res) => {
	res.send('pinged')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
