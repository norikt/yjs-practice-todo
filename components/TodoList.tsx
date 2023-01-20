import {
  Badge,
  HStack,
  IconButton,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";

type Props = {
  todos: string[];
  deleteTodo: (id: number) => void;
};

function TodoList({ todos, deleteTodo }: Props) {
  if (todos.length === 0)
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        No Todos, yay!!!
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
          <Text>{todo}</Text>
          <Spacer />
          <IconButton onClick={() => deleteTodo(idx)} {...buttonProps} />
        </HStack>
      ))}
    </VStack>
  );
}

export default TodoList;
