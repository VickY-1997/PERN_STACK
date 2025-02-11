import express from 'express'
import {products} from '../controller/product.controller.js'
const router = express.Router()

router.get('/', products)

export default router