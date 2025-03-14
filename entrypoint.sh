#!/bin/bash -e

echo $ENVIRONMENT

#Check for the ENVIRONMENT variable and replace the file based on that
if [[ $ENVIRONMENT = "Dev" ]]; then
   cp /usr/share/nginx/html/config/app-config.dev.json /usr/share/nginx/html/app-config.json
   cp /usr/src/app/src/config/secrets/secrets.dev.json /usr/src/app/src/secrets.json
fi

if [[ $ENVIRONMENT = "Production" ]]; then
   cp /usr/share/nginx/html/config/app-config.prod.json /usr/share/nginx/html/app-config.json
   cp /usr/src/app/src/config/secrets/secrets.prod.json /usr/src/app/src/secrets.json
fi

envsubst < /usr/src/app/src/app-config.json > /usr/src/app/src/app-config-final.json

# Move the final config file back to the correct location
mv /usr/src/app/src/app-config-final.json /usr/src/app/src/app-config.json

nginx -g 'daemon off;' 