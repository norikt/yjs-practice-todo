import { CollaborationStore } from ".";

export const detach = (state: CollaborationStore, key: string) => {
  const existsBundle = state.ybundles[key];
  if (!existsBundle) return;

  const { ydoc, connectionProvider, persistenceProvider } = existsBundle;
  persistenceProvider.destroy();
  connectionProvider.destroy();
  ydoc.destroy();

  delete state.ybundles[key];
};
