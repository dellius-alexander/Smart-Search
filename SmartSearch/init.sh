#!/bin/bash
#####################################################################
set -e
#####################################################################
ENV_FILE=""
HOST=""
PORT=""
export NODE_ENV=$( [[ -z "$NODE_ENV" ]] && echo "production" || echo "$NODE_ENV")
echo "Node environment: ${NODE_ENV}.................................."

#####################################################################
COMMAND=${1:-$( [[ ${1} =~ (publish|run|emulate|plugin|build|serve|help|--help|-h) ]] && echo ${1} &2>/dev/null  || echo "bad run command."; exit 1;  )} # Defaults to run -- platform
PLATFORMS=${2:-$( [[ ${2} =~ (local|cordova|gh-pages|browser|ios|android|osx|add|remove|rm)+ ]] && echo ${2} &2>/dev/null || echo "bad run command."; exit 1; )} # Defaults to run -- platform -- browser
OPTIONS=${3:-$( [[ ${3} =~ ([a-zA-z0-9_-]+|browser|ios|android|osx|add) ]] && echo ${3} &2>/dev/null )}
#####################################################################
#####################################################################
__error(){
  if [[ -z "${1}" ]]; then
    echo "ERROR: no message provided."
    exit 1
  else
    echo "ERROR: ${*}"
    exit $?
  fi
}
__help(){
    printf """
    Usage: |
    /bin/sh ${0} <COMMAND> <PLATFORMS> <OPTIONS>  \n
    [COMMAND]{(publish|run|emulate|plugin|build|serve|help|--help|-h)}
    [PLATFORMS]{(local|cordova|gh-pages|browser|ios|android|osx|add|remove|rm)}
    [OPTIONS]{([a-zA-z0-9_-]+|browser|ios|android|osx|add)} \n
    """
    exit 1;
}
__gen_env(){

  if [[ ! -z "${NODE_ENV}" && "${NODE_ENV}" =~ ^(development|production)$ && -f ./.env/.${NODE_ENV}.env ]]; then
      export $(cat ./.env/.${NODE_ENV}.env | grep -v '#' | awk '/=/ {print $1}' )
      echo "${NODE_ENV} environment setup completed........................................"
  else
    __error "Something went wrong during environment setup..................................." "\n${?}"
  fi

  if [[ "${COMMAND}" =~ ^(run|emulate|plugin|build|serve)$ ]]; then

    NODE_ENV_VAR="""NODE_ENV=${NODE_ENV}
BABEL_ENV=${NODE_ENV}
TZ="America/New_York"
UUID=1001
REACT_APP_OPENAI_API_KEY=${REACT_APP_OPENAI_API_KEY}
REACT_APP_ORGANIZATION_ID=${REACT_APP_ORGANIZATION_ID}
REACT_APP_WOLFRAMALPHA_APPID=${REACT_APP_WOLFRAMALPHA_APPID}
GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}
BASE_DOMAIN=${BASE_DOMAIN}
HOST=${BASE_DOMAIN}.com
PORT=${PORT}
HTTPS=${HTTPS}
FAST_REFRESH=${FAST_REFRESH}
PUBLIC_URL=${PUBLIC_URL}
SSL_CRT_FILE=/usr/local/app/.certs/${BASE_DOMAIN}.crt
SSL_KEY_FILE=/usr/local/app/.certs/${BASE_DOMAIN}.key

"""
    ENV_FILE="./.env.${NODE_ENV}.local";
    [ -f "${ENV_FILE}" ] && rm -f "${ENV_FILE}" &2>/dev/null && wait $!;
    echo "${NODE_ENV_VAR}" | tee "${ENV_FILE}";
    export $(cat "${ENV_FILE}");
    HOST=$(awk -F'=' '{print $2}' <<< $(cat ${ENV_FILE} | grep -i 'HOST' ));
    PORT=$(awk -F'=' '{print $2}' <<< $(cat ${ENV_FILE} | grep -i 'PORT' ));
  elif [[ "${COMMAND}" =~ ^(publish)$ ]]; then

    NODE_ENV_VAR="""NODE_ENV=${NODE_ENV}
BABEL_ENV=${NODE_ENV}
TZ="America/New_York"
REACT_APP_OPENAI_API_KEY=${REACT_APP_OPENAI_API_KEY}
REACT_APP_ORGANIZATION_ID=${REACT_APP_ORGANIZATION_ID}
REACT_APP_WOLFRAMALPHA_APPID=${REACT_APP_WOLFRAMALPHA_APPID}
GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}
HOST=${PUBLIC_URL}
HTTPS=${HTTPS}
FAST_REFRESH=true
PUBLIC_URL=${PUBLIC_URL}

"""
    ENV_FILE="./.env.${NODE_ENV}.local";
    [ -f "${ENV_FILE}" ] && rm -f "${ENV_FILE}" &2>/dev/null && wait $!;
    echo "${NODE_ENV_VAR}" | tee "${ENV_FILE}";
    export $(cat "${ENV_FILE}");
    HOST=$(awk -F'=' '{print $2}' <<< $(cat ${ENV_FILE} | grep -i 'HOST' ));
  fi


  return 0;
}
__build(){
  npm install;
  npm audit fix  &2>/dev/null;

  if [[ ! -z "${NODE_ENV}" && "${NODE_ENV}" =~ ^(development)$  ]]; then
      npm run build:dev &2>/dev/null && wait $!;
  elif [[ ! -z "${NODE_ENV}" && "${NODE_ENV}" =~ ^(production)$  ]]; then
    npm run build:prod &2>/dev/null && wait $!;
  fi
  return 0;
}
#####################################################################
__emulate(){
  COMMAND="${1:-$( [[ ${1} =~ ^(publish)$ ]] && echo ${1}  || echo "bad run command."; exit 1; )}";
  PLATFORMS="${2}";
  OPTIONS="${3}"

  case ${COMMAND}-${PLATFORMS}-${OPTIONS}-${NODE_ENV} in
  emulate-cordova-${OPTIONS}-development)
    echo "Running ${PLATFORMS}........"
    cordova build --debug;
    #  nodemon scripts/start.js;
    cordova ${COMMAND} ${OPTIONS} -- --live-reload  --debug;
    ;;
  *)
    __help
    ;;
  esac

}
__publish(){
  COMMAND="${1:-$( [[ ${1} =~ ^(publish)$ ]] && echo ${1}  || echo "bad run command."; exit 1; )}";
  PLATFORMS="${2}";
  OPTIONS="${3}"
  case ${COMMAND}-${PLATFORMS} in
  publish-gh-pages)
    npm install --save-dev gh-pages;
    mkdir -p staging/docs;
    cp -rf ./www/** ./staging/docs;
    cp ../docs/demo-readme.md ./staging/README.md;
    cp ../LICENSE ./staging/LICENSE;
    npx gh-pages -d 'staging' -m 'github pages demo updated' \
    --dest '.' \
    -b 'github-pages' -u 'Dellius Alexander <dellius.alexander@gmail.com>';
    echo "Successfully Published to gh-pages repository................................................";
    ;;
  *)
    __help
    ;;
  esac

}

__serve(){
  COMMAND="${1:-$( [[ ${1} =~ ^(serve|server)$ ]] && echo ${1}  || echo "bad run command."; exit 1; )}";
  PLATFORMS="${2}";
  OPTIONS="${3}";

  case ${COMMAND}-${PLATFORMS}-${OPTIONS}-${NODE_ENV} in
  serve-browser-${OPTIONS}-production)
    echo "Serving ${PLATFORMS}........";
    serve -l "tcp://${HOST}:${PORT}" \
    -c serve.json ${OPTIONS} \
    --ssl-cert ${SSL_CRT_FILE} \
    --ssl-key ${SSL_KEY_FILE}
    ;;
  serve-browser-${OPTIONS}-development)
    echo "Serving ${PLATFORMS}........";
    node ./scripts/start.js
    ;;
  serve-cordova-browser-production)
    echo "Running ${PLATFORMS}........";
    cordova build --debug;
    cordova serve ${OPTIONS} -- --live-reload  --debug &2>/dev/null || echo "Error service ${PLATFORMS}...$?";
    ;;
    *)
      __help
      ;;
    esac
}
__run(){
COMMAND="${1:-$( [[ ${1} =~ ^(run)$ ]] && echo ${1}  || echo "bad run command."; exit 1; )}";
PLATFORMS="${2}";
OPTIONS="${3}"

case ${COMMAND}-${PLATFORMS}-${OPTIONS}-${NODE_ENV} in
  run-browser-${OPTIONS}-${NODE_ENV})
    echo "Running ${PLATFORMS}........";
    node scripts/start.js;
    ;;
  run-dev-browser-${NODE_ENV})
    echo "Running ${PLATFORMS}........";
    nodemon --inspect scripts/start.js;
    ;;
  run-cordova-browser-production)
    echo "Running ${PLATFORMS}........"
    cordova build --debug;
    #  nodemon scripts/start.js;
    cordova run ${PLATFORMS} -- --live-reload  --debug;
    ;;
    *)
      __help
      ;;
esac
}
#####################################################################
#####################################################################
# Verify that NODE_ENV is set
if [[ -z ${NODE_ENV} ]]; then
  __error "You must set NODE_ENV environment variable then rerun ${0}."
  exit 1;
fi
#####################################################################
#####################################################################
__gen_env &&
__build &&
#####################################################################
#####################################################################
# Find and run the command
case ${COMMAND} in
run|run-local)
  __run "${COMMAND}" "${PLATFORMS}" "${OPTIONS}"
  ;;
emulate|emulator)
  __emulate "${COMMAND}" "${PLATFORMS}" "${OPTIONS}"
  ;;
serve|server)
  __serve "${COMMAND}" "${PLATFORMS}" "${OPTIONS}"
  ;;
publish)
  __publish "${COMMAND}" "${PLATFORMS}" "${OPTIONS}"
  ;;
clean)
  echo "Cleaning up ${PLATFORMS}........";
  cordova clean ${PLATFORMS} &2>/dev/null || echo "Error executing clean on ${PLATFORMS}...$?";
  ;;
plugin|plugins)
  echo "Running ${PLATFORMS}........";
  cordova plugin ${PLATFORMS} ${OPTIONS} &2>/dev/null || echo "No plugin found...$?";
  ;;
help|HELP|-h|--help|*)
  __help
  ;;
esac
