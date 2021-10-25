/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
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
        const onStarClick = useCallback(() => {
          dispatchStarred({
            type: isStarred ? 'DELETE' : 'ADD',
            showId: show.id,
          });
        }, [isStarred, show]);

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
