#!/usr/bin/env bash

CLIENT_ID=""
CLIENT_SECRET=""
AUTH_CODE=''

curl --request POST \
    --url 'https://auth.atlassian.com/oauth/token' \
    --header 'Content-Type: application/json' \
    --data '{
        "grant_type": "authorization_code",
        "client_id": "'"$CLIENT_ID"'",
        "client_secret": "'"$CLIENT_SECRET"'",
        "code": "'"$AUTH_CODE"'",
        "redirect_uri": "http://localhost:52225/callback"
    }'
