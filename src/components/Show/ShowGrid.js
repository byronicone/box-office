import React from 'react';
import ShowCard from './ShowCard';
import { FlexGrid } from '../styled';
import { IMG_PLACEHOLDER } from '../../misc/constants';

const ShowGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : IMG_PLACEHOLDER}
          summary={show.summary}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;
