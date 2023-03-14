#!/bin/bash
# unfortunately we could not get this to update docker /etc/hosts file with the updated DNS namespaces
# so the workaround was to use hostname attribute in the docker-compose.yml file
# Add the following to /etc/hosts file for loopback compatibility for custom DNS entries.
#echo "127.0.0.1 example.com *.example.com https://example.com https://www.example.com $(hostname)}" >> /etc/hosts
HOSTNAME=$( [ -z $HOSTNAME ] && hostname || echo $HOSTNAME);
export DOMAIN_BASENAME=$(echo ${HOSTNAME%.*});
export DOMAIN_NAME=${DOMAIN_BASENAME}.com;
export SSL_CRT_FILE=/usr/local/app/.certs/${DOMAIN_BASENAME}.crt;
export SSL_KEY_FILE=/usr/local/app/.certs/${DOMAIN_BASENAME}.key;

#. "${REACT_APP_HOME}/.env.${NODE_ENV}.local";

printenv;
/bin/bash /tmp/app/certs.sh  "-s" ${HOSTNAME} "/usr/local/app/.certs";
cd ${REACT_APP_HOME}

NODE_ENV=$( [ -z $NODE_ENV ] && echo "development" || echo $NODE_ENV  )
echo "Node env: $NODE_ENV..."
case "${NODE_ENV}" in
  prod|production)
    echo "Node running in ${NODE_ENV} mode.";
    npm run build:prod;
    npm run start;
    ;;
  dev|development)
    echo "Node running in ${NODE_ENV} mode.";
    export DEBUG=smartscraper:*
    npm run dev
    ;;
esac

echo "Environment: ${NODE_ENV}"
