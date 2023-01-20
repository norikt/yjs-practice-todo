import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

import { CollaborationStore } from ".";

// const serverUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT?.replace(/^https/, 'wss')}/websocket`;
const serverUrl = "ws://localhost:3001";

export const attach = async (state: CollaborationStore, key: string) => {
  const existsBundle = state.ybundles[key];
  if (existsBundle) return existsBundle;

  const ydoc = new Y.Doc();
  const connectionProvider = new WebsocketProvider(serverUrl, key, ydoc);

  // TODO: URLとretryするか
  const persistenceProvider = new IndexeddbPersistence(key, ydoc);
  state.ybundles[key] = {
    ydoc,
    connectionProvider,
    persistenceProvider,
  };

  return {
    ydoc,
    connectionProvider,
    persistenceProvider,
  };
};
