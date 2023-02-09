#!/bin/bash
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
    printf """\n
    Usage: |
    /bin/sh ${0} \\
    [COMMAND]{run|emulate|plugin|build|serve|cordova_serve|help|HELP|-h|--help|add|remove|rm} \\
    [PLATFORMS]{browser|ios|android|osx}
    """;
}

__run(){
  COMMAND="${1:-$( [[ ${1} =~ ^(run)$ ]] && echo ${1}  || echo "bad run command."; exit 1; )}"
  OPTIONS="${2}"
  case ${OPTIONS} in
  gh-pages)
    npm install gh-pages --save-dev;
    export $( cat ./.env.${NODE_ENV}.local | grep -v '#' | awk '/=/ {print $1}');

    npm audit fix;

    npx gh-pages -d 'www' -m 'github pages update' -b 'gh-pages'  \
    -u 'Dellius Alexander <dellius.alexander@gmail.com>'

#    -V, --version            output the version number
#    -d, --dist <dist>        Base directory for all source files
#    -s, --src <src>          Pattern used to select which files to publish (default: "**/*")
#    -b, --branch <branch>    Name of the branch you are pushing to (default: "gh-pages")
#    -e, --dest <dest>        Target directory within the destination branch (relative to the root) (default: ".")
#    -a, --add                Only add, and never remove existing files
#    -x, --silent             Do not output the repository url
#    -m, --message <message>  commit message (default: "Updates")
#    -g, --tag <tag>          add tag to commit
#    --git <git>              Path to git executable (default: "git")
#    -t, --dotfiles           Include dotfiles
#    -r, --repo <repo>        URL of the repository you are pushing to
#    -p, --depth <depth>      depth for clone (default: 1)
#    -o, --remote <name>      The name of the remote (default: "origin")
#    -u , --user <address>     The name and email of the user (defaults to the git config).  Format is "Your Name <email@example.com>".
#    -v, --remove <pattern>   Remove files that match the given pattern (ignored if used together with --add). (default: ".")
#    -n, --no-push            Commit only (with no push)
#    -f, --no-history         Push force new commit without parent history
#    --before-add <file>      Execute the function exported by <file> before "git add"
#    -h, --help               output usage information
    ;;
  browser)
    echo "Running ${PLATFORMS}........"
    npm install;
    node scripts/build.js;
    cordova build -- --live-reload  --debug;
#    nodemon scripts/start.js;
#    cordova run ${PLATFORMS} -- --live-reload  --debug;
    serve -l tcp://${DEMO_PAGES_URL}:${PORT} \
     -c serve.json \
     --debug \
     --ssl-cert /usr/local/app/.certs/delliusalexander.crt \
     --ssl-key /usr/local/app/.certs/delliusalexander.key
      ;;
    *)
      __help
      ;;
  esac
}
#####################################################################
COMMAND=${1:-$( [[ ${1} =~ ^(run|emulate|plugin|build|serve|cordova_serve|help|HELP|-h|--help)$ ]] && echo ${1} &2>/dev/null )} # Defaults to run -- platform
PLATFORMS=${2:-$( [[ ${2} =~ (gh-pages|browser|ios|android|osx|add|remove|rm)+ ]] && echo ${2} &2>/dev/null )} # Defaults to run -- platform -- browser
PLUGINS=${3:-$( [[ ${3} =~ ([a-zA-z0-9_-]+) ]] && echo ${3} &2>/dev/null )}

# Verify that NODE_ENV is set
if [[ -z ${NODE_ENV} ]]; then
  __error "You must set NODE_ENV environment variable then rerun ${0}."
  exit 1;
fi

# Find and run the command
case ${COMMAND} in
run)
  __run "${COMMAND}" "${PLATFORMS}"
  ;;
emulate|emulator)
  echo "Running ${PLATFORMS}........"
  npm install &2>/dev/null
  echo ${NODE_ENV} | node scripts/build.js;
  cordova build --debug;
#  nodemon scripts/start.js;
  cordova emulate ${PLATFORMS} -- --live-reload  --debug;
  ;;
serve|server)
  echo "Running ${PLATFORMS}........";
  DOMAIN_BASENAME=$(echo ${HOSTNAME%.*});
  serve -l tcp://0.0.0.0:443 \
   -c serve.json \
   --ssl-cert ${SSL_CRT_FILE} \
   --ssl-key ${SSL_KEY_FILE}
  ;;
cordova_serve)
    echo "Running ${PLATFORMS}........";
    npm install &2>/dev/null
    echo ${NODE_ENV} | node scripts/build.js;
    cordova build --debug;
    cordova serve ${PLATFORMS} -- --live-reload  --debug &2>/dev/null || echo "Error service ${PLATFORMS}...$?";
  ;;
clean)
  echo "Cleaning up ${PLATFORMS}........";
  cordova clean ${PLATFORMS} &2>/dev/null || echo "Error executing clean on ${PLATFORMS}...$?";
  ;;
plugin|plugins)
  echo "Running ${PLATFORMS}........";
  cordova plugin ${PLATFORMS} ${PLUGINS} &2>/dev/null || echo "No plugin found...$?";
  ;;
help|HELP|-h|--help|*)
  __help
  ;;
esac
