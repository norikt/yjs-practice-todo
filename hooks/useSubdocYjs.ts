import { useCallback, useEffect, useRef, useState } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import * as Y from "yjs";

type UseSubdocYjsProps<T extends Y.AbstractType<any>, U> = {
  subdoc: Y.Doc;
  sharedType: {
    name: string;
    typeConstructor?: Function | undefined;
  };
  converter: (sharedType: T) => U;
};

// subdocの場合、keyはY.Docのguidに設定されている想定
export const useSubdocYjs = <T extends Y.AbstractType<any>, U>(
  props: UseSubdocYjsProps<T, U>
) => {
  const {
    subdoc,
    sharedType: { name, typeConstructor },
    converter,
  } = props;

  // subdocの場合はWebsocketProviderは親のY.Docのを使うのでIndexeddbだけattachする
  const databaseProviderRef = useRef<IndexeddbPersistence>();
  const [value, setValue] = useState<U>();

  const attach = useCallback(() => {
    subdoc.load();
    databaseProviderRef.current = new IndexeddbPersistence(subdoc.guid, subdoc);
  }, [subdoc]);

  const detach = useCallback(() => {
    subdoc.destroy();
    databaseProviderRef.current?.destroy();
  }, [subdoc]);

  const onUpdate = useCallback(
    (onTransaction: (ydoc: Y.Doc, t: Y.Transaction) => void) =>
      subdoc.transact((t) => onTransaction(subdoc, t)),
    [subdoc]
  );

  useEffect(() => {
    return () => {
      setValue(undefined);
      detach();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const type = subdoc.get(name, typeConstructor);
    const callback = (events: Y.YEvent<T>[], t: Y.Transaction) => {
      events.forEach((event) => {
        if (event.target === type) {
          const value: U = converter(event.target);
          setValue(value);
        }
      });
    };
    type.observeDeep(callback);
    attach();

    return () => {
      type.unobserveDeep(callback);
    };
  }, [attach, converter, name, subdoc, typeConstructor]);

  return {
    value,
    onUpdate,
  };
};
