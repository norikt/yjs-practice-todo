import { useEffect, useState } from 'react'

// const initialTodos = [
//   { id: '1', body: 'get bread' },
//   { id: '2', body: 'get butter' },
// ]

export type Todo = { id: string, body: string }

function useTodo() {
  // const [todos, setTodos] = useState<Todo[]>(
  //   // use callback to run this only the first time
  //   () => JSON.parse(localStorage.getItem('todos') || "[]")
  // )

  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo])
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return [todos, addTodo, deleteTodo] as const
}

export default useTodo
