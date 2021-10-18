import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title title="Box Office" subtitle="Explore Films and Actors" />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
