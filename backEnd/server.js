import express from 'express' 
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoute from './routes/product.route.js'
import { sql } from './config/db.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 2025

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use('/api/products', productRoute)

const initDB = async () => {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS product(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        )`
        console.log(`initDb connected successfully`)
    } catch (error) {
        console.log(`Error in initDb`)
    }
}




initDB().then(() => {
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`)
})
})