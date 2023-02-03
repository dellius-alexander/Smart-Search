#!/bin/bash
# unfortunately we could not get this to update docker /etc/hosts file with the updated DNS namespaces
# so the workaround was to use hostname attribute in the docker-compose.yml file
# Add the following to /etc/hosts file for loopback compatibility for custom DNS entries.
#echo "127.0.0.1 example.com *.example.com https://example.com https://www.example.com $(hostname)}" >> /etc/hosts
npm install &2>/dev/null
npm audit fix  &2>/dev/null
NODE_ENV=$( [ -z $NODE_ENV ] && echo "development" || echo $NODE_ENV  )
echo "Node env: $NODE_ENV..."
case "${NODE_ENV}" in
  prod | production)
    echo "Node running in ${NODE_ENV} mode.";
    npm rebuild node-sass
    npm run start:browser
    ;;
  dev | development)
    echo "Node running in ${NODE_ENV} mode.";
    export DEBUG=smartscraper:*
    npm rebuild node-sass
    npm run dev:browser
    ;;
esac

echo "Environment: ${NODE_ENV}"