import React from 'react';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';
import ActorCard from './ActorCard';

const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          id={person.id}
          name={person.name}
          image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          country={person.country ? person.country.name : null}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
