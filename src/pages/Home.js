import React, { useState } from 'react';
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

const Home = () => {
  const [input, setInput] = useLastInput();
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
      <SearchInput
        type="text"
        placeholder="Search the tv world"
        onChange={onInputChange}
        onSubmit={onSearch}
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
      <div>{renderResults()}</div>
    </MainPageLayout>
  );
};

export default Home;
