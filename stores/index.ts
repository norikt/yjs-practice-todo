import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { create } from "zustand";

import { attach } from "./attach";
import { detach } from "./detach";

type YBundle = {
  ydoc: Y.Doc;
  connectionProvider: WebsocketProvider;
  persistenceProvider: IndexeddbPersistence;
};

export type CollaborationStore = {
  ybundles: {
    [key: string]: YBundle;
  };
  attach: (key: string) => Promise<YBundle>;
  detach: (key: string) => void;
  update: (
    key: string,
    onTransaction: (ydoc: Y.Doc, t: Y.Transaction) => void
  ) => void;
};

export const useCollaborationStore = create<CollaborationStore>((set, get) => ({
  ybundles: {},
  attach: (key) => attach(get(), key),
  detach: (key) => detach(get(), key),
  update: (key, onTransaction) => {
    const state = get();
    const bundle = state.ybundles[key];
    if (!bundle) return;

    bundle.ydoc.transact((t) => onTransaction(bundle.ydoc, t));
  },
}));
