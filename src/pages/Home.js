import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(console.log);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onSubmit={onSearch}
        value={input}
      />
      <button type="submit" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
