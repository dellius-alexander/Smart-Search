######################################################
# Set node version and fallback version
ARG NODE_VERSION=18:13
FROM node:${NODE_VERSION}
# Build state arguments
ARG NODE_ENV="development"
ARG BABEL_ENV="development"
ARG REACT_APP_OPENAI_API_KEY=""
ARG REACT_APP_WOLFRAMALPHA_APPID=""
ARG REACT_APP_ORGANIZATION_ID=""
ARG TZ="America/New_York"
ARG USER="node"
ARG PORT=443
ARG DOMAIN_NAME=""
ARG DOMAIN_BASENAME=""
ARG HOSTNAME=""
ARG USERNAME=""
ARG UUID=1001
######################################################
ENV REACT_APP_HOME="/home/${USERNAME}/app"
ENV NODE_ENV=${NODE_ENV}
ENV BABEL_ENV=${BABEL_ENV}
ENV PORT=${PORT}

USER root

WORKDIR "${REACT_APP_HOME}"

RUN echo "Domain name: ${DOMAIN_NAME} | DOMAIN: ${DOMAIN_BASENAME}"

RUN apt-get update -y

RUN mkdir -p \
    /tmp/app \
    /entrypoint \
   "${REACT_APP_HOME}" \
    "/usr/local/app/.certs"

COPY .devcontainer/scripts/** /tmp/app/
COPY .devcontainer/entrypoint/** /entrypoint/
COPY ./SmartSearchBackend/ "${REACT_APP_HOME}/"


RUN ls -lia "${REACT_APP_HOME}"

RUN /bin/bash /tmp/app/user.sh "${USERNAME}" "${UUID}"
RUN /bin/bash /tmp/app/certs.sh  "-s" "${HOSTNAME}" "/usr/local/app/.certs"

EXPOSE "${PORT}"

RUN chown -R ${USERNAME}:root "/usr/local/app/.certs"
RUN chown -R ${USERNAME}:root "${REACT_APP_HOME}"

RUN cd "${REACT_APP_HOME}" && \
    npm install -g npm@latest serve

### # Clean up
#RUN apt-get autoremove -y \
#    && apt-get clean -y \
#    && rm -rf /var/lib/apt/lists/* \
#    && rm -rf /tmp/app

USER ${USERNAME}

ENTRYPOINT ["/bin/sh","/entrypoint/docker-entrypoint.sh"]
#CMD ["sleep", "infinity"]
## End of Dockerfile ##################################