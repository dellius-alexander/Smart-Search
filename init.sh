#!/usr/bin/env bash
#####################################################################
COMMAND=${1:-"$([[ ${1} =~ (run|emulate(or)?){1} ]] && echo ${1} &2>/dev/null )"} # Defaults to run -- platform
PLATFORMS=${2:-"$([[ ${2} =~ (browser|ios|android|osx)+ ]] && echo ${2} &2>/dev/null )"} # Defaults to run -- platform -- browser
# Verify that NODE_ENV is set
if [[ -z ${NODE_ENV} ]]; then
  __error "You must set NODE_ENV environment variable then rerun ${0}."
  exit 1;
fi
# Find and run the command
case ${COMMAND} in
run)
  echo "Running ${PLATFORMS}........"
  npm install &2>/dev/null
  npm audit fix --force &2>/dev/null
  echo ${NODE_ENV} | node scripts/build.js;
  cordova build --debug;
#  nodemon scripts/start.js;
  cordova run ${PLATFORMS} --live-reload  --debug;
  ;;
*)
  printf """\n
  Usage: |
  /bin/sh ${0} \\
  [COMMAND]{run|emulate|serve|clean|plugin} \\
  [PLATFORMS]{browser|ios|android|osx}
  """
  ;;
esac


__error(){
  if [[ -z "${1}" ]]; then
    echo "ERROR: no message provided."
    exit 1
  else
    echo "ERROR: ${1}"
    exit !?
  fi
}