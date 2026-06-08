import Express from 'express'
import { getUserInfo } from '../controllers/user.js'

const router = Express.Router()

router.get('/me', getUserInfo)

export default router