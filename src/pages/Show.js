/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router';
import Cast from '../components/Show/Cast';
import Details from '../components/Show/Details';
import Seasons from '../components/Show/Seasons';
import ShowMainData from '../components/Show/ShowMainData';
import { useShow } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = useShow(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred: e</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
        image={show.image}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          premiered={show.premiered}
          network={show.network}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
