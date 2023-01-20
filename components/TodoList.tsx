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
import { useYTodo } from "../hooks/useYTodo";

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

const TodoList = () => {
  const { todoMap, editTodo, deleteTodo } = useYTodo();

  if (Object.keys(todoMap).length === 0)
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        タスクはありません!!
      </Badge>
    );

  return (
    <VStack {...vStackProps}>
      {Object.keys(todoMap).map((key, idx) => (
        <HStack key={idx}>
          <Input
            value={todoMap[key].body}
            onChange={(e) => {
              editTodo({
                ...todoMap[key],
                body: e.target.value,
              });
            }}
          />
          <Spacer />
          <IconButton
            onClick={() => deleteTodo(todoMap[key].id)}
            {...buttonProps}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;
