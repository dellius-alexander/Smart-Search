#!/bin/bash
#####################################################################
if [[ -f ./.env.${NODE_ENV}.local ]]; then
  export $( cat ./.env.${NODE_ENV}.local | grep -v '#' | awk '/=/ {print $1}' &2>/dev/null);
fi

if [[ -f ./.env ]]; then
  export $( cat ./.env | grep -v '#' | awk '/=/ {print $1}' &2>/dev/null);
fi
#####################################################################
__error(){
  if [[ -z "${1}" ]]; then
    echo "ERROR: no message provided."
    exit 1
  else
    echo "ERROR: ${1}"
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
__emulate(){
  COMMAND="${1:-$( [[ ${1} =~ ^(publish)$ ]] && echo ${1}  || echo "bad run command."; exit 1; )}";
  PLATFORMS="${2}";
  OPTIONS="${3}"

  case ${COMMAND}-${PLATFORMS}-${OPTIONS} in
  emulate-cordova-${OPTIONS})
    echo "Running ${PLATFORMS}........"
    npm install &2>/dev/null
    echo ${NODE_ENV} | node scripts/build.js;
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

  case ${COMMAND}-${PLATFORMS}-${OPTIONS} in
  publish-gh-pages-)
    npm install gh-pages --save-dev;
    npm audit fix;
    npx gh-pages -d 'www' -m 'github pages update' \
    -b 'gh-pages' -u 'Dellius Alexander <dellius.alexander@gmail.com>';
    echo "Successfully Published to gh-pages repository................................................"
    unset DEMO_PAGES_URL
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

  case ${COMMAND}-${PLATFORMS}-${OPTIONS} in
  serve-local-browser)
    echo "Running ${PLATFORMS}........";
    npm install;
    node scripts/build.js;
    cordova build -- --live-reload  --debug;
    #    nodemon scripts/start.js;
    #    cordova run ${PLATFORMS} -- --live-reload  --debug;
    serve -l tcp://0.0.0.0:443 \
    -c serve.json \
    --debug \
    --ssl-cert ${SSL_CRT_FILE} \
    --ssl-key ${SSL_KEY_FILE}
    ;;
  serve-browser-)
    echo "Serving ${PLATFORMS}........";
    serve -l tcp://0.0.0.0:443 \
    -c serve.json \
    --ssl-cert ${SSL_CRT_FILE} \
    --ssl-key ${SSL_KEY_FILE}
    ;;
  serve-cordova-browser)
    echo "Running ${PLATFORMS}........";
    npm install &2>/dev/null
    echo ${NODE_ENV} | node scripts/build.js;
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

case ${COMMAND}-${PLATFORMS}-${OPTIONS} in
  run-browser-)
    echo "Running ${PLATFORMS}........";
    npm install;
    node scripts/build.js;
    node scripts/start.js;
    ;;
  run-cordova-browser)
    echo "Running ${PLATFORMS}........"
    npm install &2>/dev/null
    echo ${NODE_ENV} | node scripts/build.js;
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
COMMAND=${1:-$( [[ ${1} =~ ^(publish|run|emulate|plugin|build|serve|help|--help|-h)$ ]] && echo ${1} &2>/dev/null  || echo "bad run command."; exit 1;  )} # Defaults to run -- platform
PLATFORMS=${2:-$( [[ ${2} =~ (local|cordova|gh-pages|browser|ios|android|osx|add|remove|rm)+ ]] && echo ${2} &2>/dev/null || echo "bad run command."; exit 1; )} # Defaults to run -- platform -- browser
OPTIONS=${3:-$( [[ ${3} =~ ([a-zA-z0-9_-]+|browser|ios|android|osx|add) ]] && echo ${3} &2>/dev/null || echo "bad run command."; exit 1; )}

# Verify that NODE_ENV is set
if [[ -z ${NODE_ENV} ]]; then
  __error "You must set NODE_ENV environment variable then rerun ${0}."
  exit 1;
fi

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
