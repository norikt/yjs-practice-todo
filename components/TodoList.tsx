import {
  Badge,
  HStack,
  IconButton,
  Input,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { Todo } from "../hooks/useYTodo";

type Props = {
  todos: Todo[];
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
};

function TodoList({ todos, editTodo, deleteTodo }: Props) {
  if (todos.length === 0)
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        タスクはありません!!
      </Badge>
    );

  const vStackProps = {
    p: "4",
    w: "100%",
    maxW: { base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" },
    borderColor: "gray.100",
    borderWidth: "2px",
    borderRadius: "lg",
    alignItems: "stretch",
    divider: <StackDivider />,
  };

  const buttonProps = {
    icon: <FaTrash />,
    isRound: true,
    "aria-label": "delete",
  };

  return (
    <VStack {...vStackProps}>
      {todos.map((todo, idx) => (
        <HStack key={idx}>
          <Input
            value={todo.body}
            onChange={(e) => {
              editTodo({
                ...todo,
                body: e.target.value,
              });
            }}
          />
          <Spacer />
          <IconButton onClick={() => deleteTodo(idx)} {...buttonProps} />
        </HStack>
      ))}
    </VStack>
  );
}

export default TodoList;
