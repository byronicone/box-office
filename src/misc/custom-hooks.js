import { useReducer, useEffect, useState } from 'react';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD':
      return [...prevState, action.showId];
    case 'DELETE':
      return prevState.filter(showId => showId !== action.showId);
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastInput(key = 'lastInput') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : '';
  });

  const setPersistedInput = newInput => {
    setInput(newInput);
    sessionStorage.setItem(key, JSON.stringify(newInput));
  };

  return [input, setPersistedInput];
}
