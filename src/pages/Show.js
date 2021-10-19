import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(r => {
        if (isMounted) {
          setShow(r);
          setIsLoading(false);
        }
      })
      .catch(e => {
        if (isMounted) {
          setError(e.message);
          setIsLoading(false);
        }
      });
    return function cleanup() {
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
