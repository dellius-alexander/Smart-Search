#!/bin/bash
# execute in isolated environment mode
set -e
USERNAME=${1:-"node"}
echo "${USERNAME}"
USER_UID=${2:-1001}
USER_GID=${USER_UID}
if [ $(USER) == "root" ]; then
  echo "The file [ ${0} ] must be run as root."
  echo "${?}"
  exit 1;
fi

apt-get update -y && \
apt-get -y install --no-install-recommends apt-utils --fix-missing
# Verify git, process tools, lsb-release (common in install instructions for CLIs) installed
apt-get update -y \
&& apt-get -y install git procps lsb-release
#
# Create a non-root user to use if preferred - see https://aka.ms/vscode-remote/containers/non-root-user.
groupadd --gid "${USER_GID}" "${USERNAME}"  &&
useradd -s /bin/bash --uid "${USER_UID}" --gid "${USER_GID}" -m "${USERNAME}" &&
# [Optional] Uncomment the next three lines to add sudo support
apt-get update -y  &&
apt-get install -y sudo &&
echo "${USERNAME}" ALL=\(root\) NOPASSWD:ALL > "/etc/sudoers.d/${USERNAME}" &&
chmod 0440 "/etc/sudoers.d/${USERNAME}"
mkdir -p "/home/${USERNAME}/app"

# # Clean up
# apt-get autoremove -y \
# && apt-get clean -y \
# && rm -rf /var/lib/apt/lists/*