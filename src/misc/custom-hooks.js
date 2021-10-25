import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

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

const showReducer = (state, { type, show, error }) => {
  switch (type) {
    case 'FETCH_SUCCESS':
      return { isLoading: false, show, error: null };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error };

    default:
      return state;
  }
};

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

export function useShow(showId) {
  const [state, dispatch] = useReducer(showReducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(r => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', isLoading: false, show: r });
        }
      })
      .catch(e => {
        if (isMounted) {
          dispatch({
            type: 'FETCH_ERROR',
            isLoading: false,
            error: e.message,
          });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}
