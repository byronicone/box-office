import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(r => setShow(r));
  }, [id]);

  return <div>{JSON.stringify(show)}</div>;
};

export default Show;
