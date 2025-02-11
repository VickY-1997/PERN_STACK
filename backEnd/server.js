import express from 'express' 
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoute from './routes/product.route.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 2025

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use('/api/products', productRoute)

app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`)
})
