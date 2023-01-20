import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState } from "react";

const yDoc = new Y.Doc();
const yTodoArray = yDoc.getArray<string>("todo-demo:todo-list");

function useYArrayValue<T extends unknown>(yArray: Y.Array<T>) {
  const [value, setValue] = useState<T[]>(yArray.toArray());

  useEffect(() => {
    yArray.observe((_) => {
      console.log("yArray.observe", _);
      setValue(yArray.toArray());
    });
  }, [yArray]);

  return value;
}

export const useYTodo = () => {
  const todos = useYArrayValue<string>(yTodoArray);

  console.log(todos);

  useEffect(() => {
    // Sync clients with the y-websocket provider
    const wsProvider = new WebsocketProvider(
      "ws://localhost:3001",
      "todo-demo",
      yDoc
    );

    wsProvider.on("status", (event: { status: any }) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });

    wsProvider.on("sync", (isSynced: boolean) => {
      console.log(isSynced);
    });
  }, []);

  const addTodo = (todo: string) => {
    if (todos.includes(todo)) {
      console.error(`This todo has beed stacked!`);
      return;
    }
    yTodoArray.push([todo]);
  };

  const deleteTodo = (index: number) => {
    yTodoArray.delete(index);
  };

  return { addTodo, deleteTodo, todos } as const;
};
