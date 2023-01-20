import * as Y from "yjs";
import { useYjs } from "./useYjs";

type Todo = {
  id: string;
  title: string;
};

export const useYTodo = () => {
  const { value, onUpdate } = useYjs<Y.Array<Todo>, Array<Todo>>({
    key: "todo",
    sharedType: { name: "todo-list", typeConstructor: Y.Array },
    converter: (type: Y.Array<Todo>) => type.toArray(),
  });

  console.log(value);

  const addTodo = (todo: Todo) => {
    if (value?.includes(todo)) {
      console.error(`既に設定済みのタスクです`);
      return;
    }

    onUpdate((ydoc, t) => {
      const yarr = ydoc.getArray<Todo>("todo-list");
      yarr.push([todo]);
    });
  };

  const deleteTodo = (index: number) => {
    onUpdate((ydoc, t) => {
      const yarr = ydoc.getArray<Todo>("todo-list");
      yarr.delete(index);
    });
  };

  return { addTodo, deleteTodo, todos: value || [] } as const;
};
