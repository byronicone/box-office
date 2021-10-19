import React, { useState } from 'react';
import ActorGrid from '../components/Actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/Show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(r => setResults(r));
  };

  const renderResults = () => {
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    if (results && results.length === 0) {
      return `No results found.`;
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search the tv world"
        onChange={onInputChange}
        onSubmit={onSearch}
        value={input}
      />
      <button type="submit" onClick={onSearch}>
        Search
      </button>
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            type="radio"
            id="shows-search"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="people-search">
          Actors
          <input
            type="radio"
            id="people-search"
            value="people"
            checked={searchOption === 'people'}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <div>{renderResults()}</div>i
    </MainPageLayout>
  );
};

export default Home;
