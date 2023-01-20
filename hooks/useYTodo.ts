import * as Y from "yjs";
import { useYjs } from "./useYjs";

export type Todo = {
  id: string;
  body: string;
};

// type SubDocMap = { [id: string]: Y.Doc };
export type TodoMap = { [id: string]: Todo };

const MAP_KEY = "todo-map";
export const useYTodo = () => {
  const { value, onUpdate } = useYjs<Y.Map<Todo>, TodoMap>({
    key: "todo",
    sharedType: { name: MAP_KEY, typeConstructor: Y.Map },
    converter: (type) => type.toJSON(),
  });

  const addTodo = (todo: Todo) => {
    if (value && value[todo.id]) {
      console.error(`既に設定済みのタスクです`);
      return;
    }

    onUpdate((ydoc, t) => {
      const ymap = ydoc.getMap<Todo>(MAP_KEY);
      ymap.set(todo.id, todo);
    });
  };

  const editTodo = (todo: Todo) => {
    onUpdate((ydoc, t) => {
      const ymap = ydoc.getMap<Todo>(MAP_KEY);
      const map = ymap.toJSON();
      ymap.set(todo.id, { ...map[todo.id], ...todo });
    });
  };

  const deleteTodo = (id: string) => {
    onUpdate((ydoc, t) => {
      const ymap = ydoc.getMap<Todo>(MAP_KEY);
      ymap.delete(id);
    });
  };

  return { addTodo, editTodo, deleteTodo, todoMap: value || {} } as const;
};
