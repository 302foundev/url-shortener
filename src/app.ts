import express from 'express';
import cookieParser from 'cookie-parser'

process.loadEnvFile()

const app = express()

app.use(express.json())
app.use(cookieParser())

const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT

app.get('/', (_req, res) => {
  res.send("Hello world, There is someone new in the staff")
})

app.listen(PORT, () => {
  console.log("Server runing on: ", 'http://localhost:', PORT)
})

