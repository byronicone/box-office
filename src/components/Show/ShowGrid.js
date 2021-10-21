import React from 'react';
import ShowCard from './ShowCard';
import { FlexGrid } from '../styled';
import { IMG_PLACEHOLDER } from '../../misc/constants';
import { useShows } from '../../misc/custom-hooks';

const ShowGrid = ({ data }) => {
  const [starredShows, dispatchStarred] = useShows();

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);
        const onStarClick = () => {
          dispatchStarred({
            type: isStarred ? 'DELETE' : 'ADD',
            showId: show.id,
          });
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMG_PLACEHOLDER}
            summary={show.summary}
            isStarred={isStarred}
            onStarClick={onStarClick}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
