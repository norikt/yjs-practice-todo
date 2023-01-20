import * as Y from "yjs";
import { useYjs } from "./useYjs";

export type Todo = {
  id: string;
  body: string;
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

  const editTodo = (todo: Todo) => {
    if (value?.includes(todo)) {
      console.error(`既に設定済みのタスクです`);
      return;
    }

    onUpdate((ydoc, t) => {
      const yarr = ydoc.getArray<Todo>("todo-list");
      const arr = yarr.toArray();
      const index = arr.findIndex((t) => t.id === todo.id);

      yarr.delete(index, 1);
      yarr.insert(index, [todo]);
    });
  };

  const deleteTodo = (index: number) => {
    onUpdate((ydoc, t) => {
      const yarr = ydoc.getArray<Todo>("todo-list");
      yarr.delete(index);
    });
  };

  return { addTodo, editTodo, deleteTodo, todos: value || [] } as const;
};
