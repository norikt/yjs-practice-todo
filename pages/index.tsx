import {Heading, VStack} from '@chakra-ui/react'
import type {NextPage} from 'next'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import useTodo from "../hooks/useTodo";
import {useYTodo} from "../hooks/useYTodo";

const Home: NextPage = () => {
  const {todos, addTodo, deleteTodo} = useYTodo()

  return (
    <VStack p={4}>
      <Heading size='2xl'>Todo Sample</Heading>
      <AddTodo addTodo={addTodo}/>
      <TodoList todos={todos} deleteTodo={deleteTodo}/>
    </VStack>
  )
}

export default Home
