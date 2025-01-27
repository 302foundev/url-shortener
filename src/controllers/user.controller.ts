import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail, findUserById, deleteUserById } from '../models/user.model'
import { CreateUserDto } from '../dtos/user.dto'

const saltRounds = 10
const jwtSecret = process.env.JWT_SECRET as string

// User registration
export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password }: CreateUserDto = req.body

  try {
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await createUser(first_name, last_name, email, hashedPassword)

    res.status(201).json({ message: 'User created', user })
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
}

// User login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await findUserByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' })
    res.json({ message: 'Login successful', token })
  }

  catch (error) {
    res.status(500).json({ error: error })
  }
}

// Get user data
export const getUserData = async (req: Request, res: Response) => {
  const userId = req.userId.sub

  try {
    const user = await findUserById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  }

  catch (error) {
    res.status(500).json({ error: error })
  }
}

// Deleting user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.userId

  try {
    await deleteUserById(userId)
    res.json({ message: 'User deleted successfully' })
  }

  catch (error) {
    res.status(500).json({ error: error })
  }
}

// Login out user
export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' })
}


