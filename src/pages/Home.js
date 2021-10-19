import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(r => setResults(r));
  };

  const renderResults = () => {
    if (results && results.length > 0) {
      return results.map(item => {
        return <div key={item.show.id}>{item.show.name}</div>;
      });
    }
    if (results && results.length === 0) {
      return 'No shows found.';
    }
    return null;
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
      <div>{renderResults()}</div>i
    </MainPageLayout>
  );
};

export default Home;
