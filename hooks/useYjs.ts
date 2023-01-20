import { useCallback, useEffect, useState } from "react";
import * as Y from "yjs";

import { useCollaborationStore } from "../stores";

type UseYjsProps<T extends Y.AbstractType<any>, U> = {
  key: string;
  sharedType: {
    name: string;
    typeConstructor?: Function | undefined;
  };
  converter: (sharedType: T) => U;
};

export const useYjs = <T extends Y.AbstractType<any>, U>(
  props: UseYjsProps<T, U>
) => {
  const {
    key,
    sharedType: { name, typeConstructor },
    converter,
  } = props;
  const [ydoc, setYdoc] = useState<Y.Doc>();
  const [value, setValue] = useState<U>();
  const { attach, detach, update } = useCollaborationStore();

  useEffect(() => {
    (async () => {
      const bundle = await attach(key);
      setYdoc(bundle.ydoc);
    })();
    return () => {
      setValue(undefined);
      detach(key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!ydoc) return;

    // attachが終わったydocに対してobserveする
    const type = ydoc.get(name, typeConstructor);
    const callback = (events: Y.YEvent<T>[], t: Y.Transaction) => {
      events.forEach((event) => {
        if (event.target === type) {
          const value: U = converter(event.target);
          console.log("observed setValue", value);
          setValue(value);
        }
      });
    };
    type.observeDeep(callback);

    return () => {
      type.unobserveDeep(callback);
    };
  }, [converter, name, typeConstructor, ydoc]);

  const onUpdate = useCallback(
    (onTransaction: (ydoc: Y.Doc, t: Y.Transaction) => void) =>
      update(key, onTransaction),
    [key, update]
  );

  return {
    value,
    onUpdate,
    ydoc,
  };
};
