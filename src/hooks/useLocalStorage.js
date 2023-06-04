import React, { useEffect, useRef, useState } from "react";

const useLocalStorage = (
  key,
  defaultValue,
  { serialize = JSON.stringify, deserailize = JSON.parse } = {}
) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserailize(valueInLocalStorage);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]

};

export default useLocalStorage;
