import { createContext, useContext, useState, ReactNode } from "react"

export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

export interface Collection {
  id: number
  name: string
}

interface SessionContextType {
  collections: Collection[] | null
  todos: Todo[] | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  getCollections: () => Promise<void>
  createCollection: (title: string) => Promise<void>
  getTodos: (collectionId: number) => Promise<void>
  addTodo: (collectionId: number, title: string, description: string) => Promise<void>
  updateTodo: (
    collectionId: number,
    todoId: number,
    title: string,
    description: string,
    completed: boolean
  ) => Promise<void>
  deleteTodo: (collectionId: number, todoId: number) => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState<Collection[] | null>(null)
  const [todos, setTodos] = useState<Todo[] | null>(null)
  const [loading, setLoading] = useState(false)

  const baseUrl = "http://localhost:8001"

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        throw new Error("Failed to sign in")
      }
      const data = await response.json()
      const token = data.token
      if (!token) {
        throw new Error("No token received")
      }
      localStorage.setItem("SessionToken", token)
    } catch (error) {
      console.error("SignIn Error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string): Promise<void> => {
    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        throw new Error("Failed to sign up")
      }
    } catch (error) {
      console.error("SignUp Error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    localStorage.removeItem("SessionToken")
    setCollections(null)
    setTodos(null)
    window.location.href = "/signin"
  }

  // COLLECTIONS
  const getCollections = async (): Promise<void> => {
    try {
      const authToken = localStorage.getItem("SessionToken")
      const response = await fetch(`${baseUrl}/collections`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      if (!response.ok) throw new Error("Failed to fetch collections")
      const data = await response.json()
      setCollections(data.collections)
    } catch (error) {
      console.error("Get Collections Error:", error)
      throw error
    }
  }

  const createCollection = async (title: string): Promise<void> => {
    try {
      const authToken = localStorage.getItem("SessionToken")
      const response = await fetch(`${baseUrl}/collection/new/${title}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to create collection")
      }
      // Refresh collections list
      await getCollections()
    } catch (error) {
      console.error("Create Collection Error:", error)
      throw error
    }
  }

  // TODOS
  const getTodos = async (collectionId: number): Promise<void> => {
    try {
      const authToken = localStorage.getItem("SessionToken")
      const response = await fetch(`${baseUrl}/collection/${collectionId}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to get todos")
      }
      const data = await response.json()
      setTodos(data.todos)
    } catch (error) {
      console.error("Get Todos Error:", error)
      throw error
    }
  }

  const addTodo = async (
    collectionId: number,
    title: string,
    description: string
  ): Promise<void> => {
    try {
      const authToken = localStorage.getItem("SessionToken")
      const response = await fetch(`${baseUrl}/collection/${collectionId}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, description }),
      })
      if (!response.ok) {
        throw new Error("Failed to add todo")
      }
      await getTodos(collectionId)
    } catch (error) {
      console.error("Add Todo Error:", error)
      throw error
    }
  }

  const updateTodo = async (
    collectionId: number,
    todoId: number,
    title: string,
    description: string,
    completed: boolean
  ): Promise<void> => {
    try {
      const authToken = localStorage.getItem("SessionToken")
      const response = await fetch(`${baseUrl}/collection/${collectionId}/todo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ todoId, title, description, completed }),
      })
      if (!response.ok) {
        throw new Error("Failed to update todo")
      }
      await getTodos(collectionId)
    } catch (error) {
      console.error("Update Todo Error:", error)
      throw error
    }
  }

  const deleteTodo = async (collectionId: number, todoId: number): Promise<void> => {
    try {
      const authToken = localStorage.getItem("SessionToken")
      const response = await fetch(`${baseUrl}/collection/${collectionId}/todo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ todoId }),
      })
      if (!response.ok) {
        throw new Error("Failed to delete todo")
      }
      await getTodos(collectionId)
    } catch (error) {
      console.error("Delete Todo Error:", error)
      throw error
    }
  }

  return (
    <SessionContext.Provider
      value={{
        collections,
        todos,
        loading,
        signIn,
        signOut,
        signUp,
        getCollections,
        createCollection,
        getTodos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
