import React, { useEffect, useState } from 'react';
import Repositories from './Repositories';

const Profile = ({ user, octokit, isLoading, setIsLoading }) => {
  const [profileData, setProfileData] = useState({});
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    console.log('here');
    octokit
      .request('GET /users/{username}', {
        username: user,
      })
      .then(({ data }) => {
        console.log(data);
        setIsLoading(false);
        setIsValidUser(true);
        setProfileData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsValidUser(false);
        console.log(err);
      });
  }, [user]);
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isValidUser ? (
        <>
          <div class="row offset-2 m-4">
            <img id="avtar" className="col-4 col-lg-3"  src={profileData.avatar_url}></img>
            <div class="col-6 center align-middle">
              <h1>{profileData.login}</h1>
              <h1>{profileData.name}</h1>
              <h1>{profileData.bio}</h1>
              <h1>{profileData.location}</h1>
              <h1>followers: {profileData.followers}</h1>
              <h1>following: {profileData.following}</h1>
              <h1>public repos: {profileData.public_repos}</h1>
            </div>
          </div>
          <Repositories
            userName={user}
            octokit={octokit}
            totalRepos={profileData.public_repos}
          />
        </>
      ) : (
        <h1>Invalid User</h1>
      )}
    </div>
  );
};

export default Profile;
