import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import dotenv from "dotenv"
import prisma from "#prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const SECRET_KEY = process.env.JWT_SECRET || "secret"

app.use(cors())
app.use(express.json())

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")
  if (!token) {
    res.status(401).json({ message: "Access denied" })
    return
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY)
    ;(req as any).user = verified
    next()
  } catch {
    res.status(400).json({ message: "Invalid token" })
  }
}

app.get("/", (req: Request, res: Response): void => {
  res.send("Kayba Technical Test")
})

app.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: "Email and password required" })
      return
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      res.status(400).json({ message: "User already exists" })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: { email, password: hashedPassword }
    })

    res.status(201).json({ message: "User created successfully" })
  } catch {
    res.status(500).json({ message: "Internal server error" })
  }
})

app.post("/signin", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" })
      return
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.status(400).json({ message: "Invalid credentials" })
      return
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "420h"
    })
    res.json({ token, message: "Sign-in successful" })
  } catch {
    res.status(500).json({ message: "Internal server error" })
  }
})

app.post(
  "/collection/:id/todo",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const collectionId = Number(req.params.id)
      const { title, description } = req.body
      if (!title) {
        res.status(400).json({ message: "Title is required" })
        return
      }

      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          collectionId
        }
      })
      res.status(201).json({ message: "Todo created", todo })
    } catch {
      res.status(500).json({ message: "Internal server error" })
    }
  }
)

app.put(
  "/collection/:id/todo",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const collectionId = Number(req.params.id)
      const { todoId, title, completed, description } = req.body
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(todoId) },
        data: {
          title,
          completed,
          description,
          collection: { connect: { id: collectionId } }
        }
      })

      res.json({ message: "Todo updated", updatedTodo })
    } catch {
      res.status(500).json({ message: "Internal server error" })
    }
  }
)

app.delete(
  "/collection/:id/todo",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { todoId } = req.body
      await prisma.todo.delete({ where: { id: Number(todoId) } })
      res.json({ message: "Todo deleted" })
    } catch {
      res.status(500).json({ message: "Internal server error" })
    }
  }
)

app.get(
  "/collection/:id/todos",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const collectionId = Number(req.params.id)
      const todos = await prisma.todo.findMany({
        where: { collectionId: collectionId }
      })
      res.json({ todos })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
)

app.post(
  "/collection/new/:title",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId
      const { title } = req.params

      const newCollection = await prisma.collection.create({
        data: { name: title, userId }
      })
      res.status(201).json({ message: "Collection created", newCollection })
    } catch {
      res.status(500).json({ message: "Internal server error" })
    }
  }
)

app.get(
  "/collections",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId
      const collections = await prisma.collection.findMany({
        where: { userId }
      })
      res.json({ collections })
    } catch {
      res.status(500).json({ message: "Internal server error" })
    }
  }
)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
