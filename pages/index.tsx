import { Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import useTodo from "../hooks/useTodo";
import { useYTodo } from "../hooks/useYTodo";

const Home: NextPage = () => {
  return (
    <VStack p={4}>
      <Heading size="2xl">Todo Sample</Heading>
      <AddTodo />
      <TodoList />
    </VStack>
  );
};

export default Home;
