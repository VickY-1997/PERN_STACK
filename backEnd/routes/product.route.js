import express from 'express'
import {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controller/product.controller.js'
const router = express.Router()

router.get('/', getAllProducts)
router.post('/', createProduct)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id' , deleteProduct)

export default router