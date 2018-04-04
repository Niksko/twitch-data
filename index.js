const querystring = require('querystring');
const fetch = require('node-fetch');
const util = require('util');
const fs = require('fs');

const asyncWriteFile = util.promisify(fs.writeFile);

const baseApiUri = 'https://api.twitch.tv/helix';
const clientId = process.env.CLIENT_ID;
const userId = process.env.USER_ID;
const followerCountFilename = process.env.FOLLOWER_COUNT_FILENAME;
const lastFollowerFilename = process.env.LAST_FOLLOWER_FILENAME;

const fetchFollowersForUserId = async (userId) => {
  const headers = {
    'Client-ID': clientId
  };

  const followersRequestQueryParameters = {
    'from_id': userId
  };

  const fetchFollowersPath = '/users/follows?' + querystring.encode(followersRequestQueryParameters);

  const followersResponse = await fetch(
    baseApiUri + fetchFollowersPath,
    {
      headers
    });

  const followersResponseJson = await followersResponse.json();

  const totalFollowers = followersResponseJson.total;
  const userIdOfLastFollower = followersResponseJson.data[0].to_id;

  const usersRequestQueryParameters = {
    'id': userIdOfLastFollower
  };

  const fetchUserDisplayNamePath = '/users?' + querystring.encode(usersRequestQueryParameters);

  const usersResponse = await fetch(
    baseApiUri + fetchUserDisplayNamePath,
    {
      headers
    }
  );

  const usersResponseJson = await usersResponse.json();

  const lastFollowerDisplayName = usersResponseJson.data[0].display_name;

  return {
    totalFollowers,
    lastFollowerDisplayName
  };
};

const saveFollowerStatsToFile = async ({totalFollowers, lastFollowerDisplayName}) => {
  asyncWriteFile(followerCountFilename, totalFollowers);
  asyncWriteFile(lastFollowerFilename, lastFollowerDisplayName);
};

fetchFollowersForUserId(userId)
  .then(saveFollowerStatsToFile)
  .catch((err) => {
    console.log(err);
  });