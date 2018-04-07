# twitch-data

A small application to grab my latest follower and follower count from
the Twitch API and output to files, for display on my stream

# Instructions

Start the application with `docker-compose start`

# Environment variables

Environment variables are stored in the `.env` file.
Currently available variables:
* `USER_ID`: Determines which user to fetch followers for
* `CLIENT_ID`: The Twitch API application client id, required to interact
with the API
* `FOLLOWER_COUNT_FILENAME`: The path inside the container to the file
that will contain the follower count
* `LAST_FOLLOWER_FILENAME`: The path inside the container to the file
that will contain the last follower's name
* `POLL_INTERVAL_MS`: The polling frequency in 'ms' to run the application. Defaults to 15000ms
