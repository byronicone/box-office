import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/Actor/ActorGrid';
import { CustomRadio } from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/Show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastInput } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const renderResults = results => {
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

const Home = () => {
  const [input, setInput] = useLastInput();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(r => setResults(r));
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search the tv world"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="people-search"
            value="people"
            checked={searchOption === 'people'}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="submit" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      <div>{renderResults(results)}</div>
    </MainPageLayout>
  );
};

export default Home;
