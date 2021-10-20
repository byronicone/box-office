import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (state = initialState, { type, show, error }) => {
  switch (type) {
    case 'FETCH_SUCCESS':
      return { isLoading: false, show, error: null };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error };

    default:
      return state;
  }
};

const Show = () => {
  const { id } = useParams();
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
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
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred: e</div>;
  }

  return <div>{JSON.stringify(show)}</div>;
};

export default Show;
