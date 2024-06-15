import { Router } from 'express'
import { about, homePage } from '../controllers/mainController.js'

const router = Router()

router.get('/', homePage)
router.get('/about', about)

export default router