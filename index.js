const querystring = require('querystring');
const fetch = require('node-fetch');

const baseApiUri = 'https://api.twitch.tv/helix';
const clientId = process.env.CLIENT_ID;
const userId = process.env.USER_ID;

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

fetchFollowersForUserId(userId)
  .then((returnValue) => {
    console.log(returnValue);
  })
  .catch((err) => {
    console.log(err);
  });