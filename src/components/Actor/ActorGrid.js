import React from 'react';
import { FlexGrid } from '../styled';
import ActorCard from './ActorCard';
import { IMG_PLACEHOLDER } from '../../misc/constants';

const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          id={person.id}
          name={person.name}
          image={person.image ? person.image.medium : IMG_PLACEHOLDER}
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
