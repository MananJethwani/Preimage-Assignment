import React, { useState } from 'react';

const SearchBar = ({ setUserName, setIsLoading }) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="input-group">
        <input
          type="text"
          name="query"
          className="form-control"
          class="col-5 offset-2 mt-4"
          placeholder="Search Username"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button
            className="btn btn-primary btn-block"
            class="col-2"
            type="button"
            onClick={() => {
              setUserName(query);
              setIsLoading(true);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
