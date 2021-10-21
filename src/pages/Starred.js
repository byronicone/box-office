import React, { useState, useEffect } from 'react';
import { useShows } from '../misc/custom-hooks';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/Show/ShowGrid';

const Starred = () => {
  const [starredShows] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const results = starredShows.map(showId => apiGet(`/shows/${showId}`));
    Promise.all(results)
      .then(apiData => apiData.map(show => ({ show })))
      .then(showResults => {
        setShows(showResults);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setIsLoading(false);
      });
  }, [starredShows]);

  return (
    <MainPageLayout>
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong: {error}</div>}
      {!isLoading && !error && !shows && <div>No shows were added.</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
