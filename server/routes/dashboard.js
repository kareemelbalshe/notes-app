import { Router } from 'express'
import { dashboard } from '../controllers/dashboardController.js'
import { isLoggedIn } from '../middleware/checkAuth.js'

const router = Router()

router.get('/dashboard',isLoggedIn, dashboard)

export default router