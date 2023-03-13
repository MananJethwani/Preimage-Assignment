import React, { useEffect } from 'react';

const Repositories = ({ userName, octokit, totalRepos }) => {
  let [repoList, setRepoList] = React.useState([]);
  let [page, setPage] = React.useState(1);
  let [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    octokit
      .request('GET /users/{username}/repos', {
        username: userName,
        page: page,
        per_page: 10,
      })
      .then(({ data }) => {
        console.log(data);
        setRepoList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [userName, page]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {repoList.map((repo) => {
            console.log(repo);
            return (
              <div key={repo.id} class="card offset-4 col-5 mb-4">
                <div class="card-header">{repo.name}</div>
                <div class="card-body">
                  <h5 class="card-title">{repo.description}</h5>
                  <h2 class="card-title"><span>Language: </span> {repo.language}</h2>
                  <h2 class="card-title"><span>Forks:</span> {repo.forks_count}</h2>
                  <h2 class="card-title"><span>Watchers: </span> {repo.watchers_count}</h2>
                </div>
              </div>
            );
          })}
          <button disabled={page == 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button
            disabled={totalRepos / 10 + (totalRepos % 10 != 0) <= page}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </>
      )}
    </>
  );
};

export default Repositories;
