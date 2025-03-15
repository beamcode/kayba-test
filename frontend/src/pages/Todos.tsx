import React, { FormEvent, useState, useEffect } from "react"
import Input from "@/components/Input"
import Textarea from "@/components/TextArea"
import { BiTrash } from "react-icons/bi"
import { FaPlus, FaTimes, FaSignOutAlt } from "react-icons/fa"
import { useSession } from "@/contexts/SessionContext"
import type { Todo } from "@/contexts/SessionContext"
import { CgNotes } from "react-icons/cg"
import Logo from "@/components/Logo"
interface ItemListProps {
  todos: Todo[]
  onItemClick?: (item: Todo) => void
}

interface EditItemFormProps {
  item: Todo
  onCancel: () => void
  selectedCollectionId: number
}

const AddTodoForm: React.FC<{
  onCancel: () => void
  selectedCollectionId: number
}> = ({ onCancel, selectedCollectionId }) => {
  const { addTodo } = useSession()
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const title = (form.elements.namedItem("title") as HTMLInputElement).value
    const description = (form.elements.namedItem("description") as HTMLInputElement).value

    // if (!/^[A-Za-z]/.test(title)) {
    //   setError("Title must start with a letter.")
    //   return
    // }

    // const wordCount = title.trim().split(/\s+/).length
    // if (wordCount < 5 || wordCount > 20) {
    //   setError("Title must be between 5 and 20 words.")
    //   return
    // }

    addTodo(selectedCollectionId, title, description)
    onCancel()
  }

  return (
    <div className="flex flex-col rounded-sm">
      <h1 className="mb-2 font-bold text-sm">Add a ToDo</h1>
      <form className="bg-white flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input name="title" type="text" placeholder="Name" />
        <Textarea name="description" placeholder="Description" rows={5} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2 w-full">
          <button
            className="border border-gray-300 w-10 flex items-center justify-center rounded-sm cursor-pointer font-bold transition-all p-2 text-sm bg-gray-200 hover:scale-[1.02] active:scale-100"
            type="button"
            onClick={onCancel}
          >
            <FaTimes size={14} />
          </button>
          <button
            className="border border-gray-300 w-full rounded-sm cursor-pointer font-bold transition-all p-2 text-sm bg-blue-200 hover:scale-[1.02] active:scale-100"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onCancel, selectedCollectionId }) => {
  const { updateTodo, deleteTodo } = useSession()
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [completed, setCompleted] = useState(item.completed)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateTodo(selectedCollectionId, item.id, title, description, completed)
    onCancel()
  }

  const handleDelete = () => {
    deleteTodo(selectedCollectionId, item.id)
    onCancel()
  }

  return (
    <div className="absolute inset-0 top-12 flex flex-col rounded-sm p-4">
      <h1 className="mb-2">
        <span className="font-bold text-sm">Edit</span> "{item.title}"
      </h1>
      <form className="bg-white flex flex-col gap-2" onSubmit={handleSubmit}>
        <select
          className={`border border-r-8 border-gray-300 w-full text-center cursor-pointer rounded-sm font-bold transition-all p-2 text-sm ${
            completed ? "bg-green-300 border-green-300" : "bg-orange-300 border-orange-300"
          }`}
          value={completed ? "true" : "false"}
          onChange={(e) => setCompleted(e.target.value === "true")}
        >
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>

        <Input
          type="text"
          value={title}
          onChange={(val: string) => setTitle(val)}
          placeholder="Name"
        />
        <Textarea
          value={description}
          onChange={(val: string) => setDescription(val)}
          placeholder="Desc"
          rows={10}
          className="min-h-[200px]"
        />

        <div className="flex gap-2 w-full">
          <button
            className="border border-gray-300 w-10 flex items-center justify-center rounded-sm cursor-pointer font-bold transition-all p-2 text-sm bg-gray-200 hover:scale-[1.02] active:scale-100"
            type="button"
            onClick={onCancel}
          >
            <FaTimes size={14} />
          </button>
          <button
            className="border border-gray-300 w-full rounded-sm cursor-pointer font-bold transition-all p-2 text-sm bg-blue-200 hover:scale-[1.02] active:scale-100"
            type="submit"
          >
            Update
          </button>
          <button
            className="border border-gray-300 w-fit rounded-sm cursor-pointer font-bold transition-all p-2 text-sm bg-red-400 hover:scale-[1.02] active:scale-100"
            type="button"
            onClick={handleDelete}
          >
            <BiTrash size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

const TodosList: React.FC<ItemListProps> = ({ todos, onItemClick }) => (
  <div className="gap-2 flex flex-col">
    {todos.map((item) => (
      <div
        key={item.id}
        className="flex justify-between items-center p-2 py-1 bg-gray-100 hover:scale-[1.02] active:scale-100 cursor-pointer transition-transform border border-gray-300 rounded-sm"
        onClick={() => onItemClick?.(item)}
      >
        <div className="flex flex-col">
          <h1 className="text-sm">{item.title}</h1>
          <p className="text-sm text-gray-400">
            {new Date(item.createdAt).toLocaleString("default", {
              day: "numeric",
              month: "long",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
        <div
          className={`rounded-sm p-1 px-1.5 text-xs select-none ${
            item.completed ? "bg-green-300" : "bg-orange-300"
          }`}
        >
          {item.completed ? "Completed" : "Pending"}
        </div>
      </div>
    ))}
  </div>
)

const AddCollectionForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { createCollection } = useSession()
  const [title, setTitle] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await createCollection(title)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center">
      <h1 className="text-sm font-bold mb-1">Create a Collection</h1>
      <Input
        name="title"
        type="text"
        placeholder="Collection Name"
        value={title}
        onChange={(value) => setTitle(value)}
      />
      <button
        type="submit"
        className="border w-full border-gray-300 rounded-sm cursor-pointer hover:scale-[1.02] transition-transform active:scale-100 bg-blue-300 p-2 px-3 flex items-center justify-center"
      >
        Create
      </button>
    </form>
  )
}

export default function Todos() {
  const { todos, collections, loading, getTodos, getCollections, signOut } = useSession()
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null)
  const [isAddTodoFormVisible, setAddTodoFormVisible] = useState(false)
  const [isAddCollectionFormVisible, setAddCollectionFormVisible] = useState(false)
  const [isEditFormVisible, setEditFormVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState<Todo | null>(null)

  const handleItemClick = (item: Todo) => {
    setCurrentItem(item)
    setAddTodoFormVisible(false)
    setAddCollectionFormVisible(false)
    setEditFormVisible(true)
  }

  const handleToggleAddCollection = () => {
    if (isAddCollectionFormVisible) {
      setAddCollectionFormVisible(false)
    } else {
      setAddTodoFormVisible(false)
      setEditFormVisible(false)
      setAddCollectionFormVisible(true)
    }
  }

  const handleToggleAddTodo = () => {
    if (isAddTodoFormVisible) {
      setAddTodoFormVisible(false)
    } else {
      setEditFormVisible(false)
      setAddCollectionFormVisible(false)
      setAddTodoFormVisible(true)
    }
  }

  useEffect(() => {
    getCollections().catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (collections && collections.length > 0) {
      const firstId = collections[0].id
      setSelectedCollectionId(firstId)
      getTodos(firstId)
    }
  }, [collections])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value)
    setSelectedCollectionId(id)
    getTodos(id)
  }

  return (
    <div className="flex justify-center h-screen flex flex-col items-center gap-4">
      <Logo />
      <div className="flex flex-col relative border border-gray-300 rounded-sm p-4 max-w-md h-[650px] space-y-4 w-96 shadow-lg">
        <div className="flex justify-between items-center w-full gap-2">
          <div className="border border-gray-300 rounded-sm w-full">
            <select
              className="rounded-[7px] p-2 bg-gray-200 border-r-4 border-r-gray-200 w-full"
              onChange={handleSelectChange}
              value={selectedCollectionId ?? ""}
            >
              {collections &&
                collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              className="border border-gray-300 rounded-sm cursor-pointer hover:scale-110 transition-transform active:scale-95 bg-blue-300 p-2 px-3 flex items-center justify-center"
              onClick={handleToggleAddCollection}
            >
              <FaPlus size={14} />
            </button>

            <button
              className="border border-gray-300 rounded-sm cursor-pointer hover:scale-110 transition-transform active:scale-95 bg-purple-300 p-2 px-3 flex items-center justify-center"
              onClick={handleToggleAddTodo}
            >
              <CgNotes size={18} />
            </button>

            <button
              className="border-2 text-xs flex gap-2 font-bold border-red-500 rounded-sm cursor-pointer hover:scale-105 transition-transform active:scale-100 bg-red-200 p-2 items-center justify-center"
              onClick={signOut}
            >
              Disconnect
              <FaSignOutAlt size={14} />
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {isAddCollectionFormVisible && (
              <AddCollectionForm onCancel={() => setAddCollectionFormVisible(false)} />
            )}

            {isAddTodoFormVisible && selectedCollectionId !== null && (
              <AddTodoForm
                onCancel={() => setAddTodoFormVisible(false)}
                selectedCollectionId={selectedCollectionId}
              />
            )}

            {isEditFormVisible && currentItem && selectedCollectionId !== null && (
              <EditItemForm
                item={currentItem}
                onCancel={() => setEditFormVisible(false)}
                selectedCollectionId={selectedCollectionId}
              />
            )}

            {!isAddTodoFormVisible && !isEditFormVisible && !isAddCollectionFormVisible && (
              <>
                {collections && collections.length > 0 ? (
                  <div className="flex flex-col gap-2 overflow-scroll px-1">
                    <h1 className="text-sm font-bold mb-2 text-orange-300">Pending</h1>
                    {todos && todos.filter((t) => !t.completed).length > 0 ? (
                      <TodosList
                        todos={todos.filter((t) => !t.completed)}
                        onItemClick={handleItemClick}
                      />
                    ) : (
                      <p className="text-gray-500 text-center text-sm">No pending todos</p>
                    )}

                    <h1 className="text-sm font-bold mb-2 mt-4 text-green-400">Completed</h1>
                    {todos && todos.filter((t) => t.completed).length > 0 ? (
                      <TodosList
                        todos={todos.filter((t) => t.completed)}
                        onItemClick={handleItemClick}
                      />
                    ) : (
                      <p className="text-gray-500 text-center text-sm">No completed todos</p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500 text-center text-sm">No collections available</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
