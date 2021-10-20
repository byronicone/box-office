import React from 'react';
import { IMG_PLACEHOLDER } from '../../misc/constants';
import { CastList } from './Cast.styled';

const Cast = ({ cast }) => {
  return (
    <CastList>
      {cast.map(({ person, character, voice }, key) => (
        <div className="cast-item" key={key}>
          <div className="pic-wrapper">
            <img
              src={person.image ? person.image.medium : IMG_PLACEHOLDER}
              alt="cast-person"
            />
          </div>
          <div>
            <span className="actor">
              <span className="bold">{person.name}</span> | {character.name}{' '}
              {voice ? '| Voice' : ''}
            </span>
          </div>
        </div>
      ))}
    </CastList>
  );
};

export default Cast;
