# Android development - command-line cheatsheet

## See also

[Cheatsheet for adb commands](https://gist.github.com/phlummox/5be8250e9b255d80198fa9e4ad200c1d), forked from [Pulimet/AdbCommands](https://gist.github.com/Pulimet/5013acf2cd5b28e55036c82c91bd56d8)

## Download Android command-line tools

```
ANDROID_TOOLS_ZIP=commandlinetools-linux-7583922_latest.zip
ANDROID_TOOLS_URL=https://dl.google.com/android/repository/${ANDROID_TOOLS_ZIP}
wget $ANDROID_TOOLS_URL
ANDROID_SDK_ROOT=~/Android/Sdk
mkdir -p $ANDROID_SDK_ROOT/cmdline-tools
unzip -q commandlinetools-linux-*.zip -d /tmp
rm commandlinetools-linux-*.zip
mv /tmp/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest
```

## Download Android studio

```
ANDROID_STUDIO_URL=https://dl.google.com/dl/android/studio/ide-zips/2020.3.1.26/android-studio-2020.3.1.26-linux.tar.gz
curl -s $ANDROID_STUDIO_URL | sudo tar xf - --gzip -C /opt
```

Or can use IntelliJ IDEA Community Edition for almost all purposes (& it might be a skerrick faster):
https://download-cdn.jetbrains.com/idea/ideaIC-2021.3.1.tar.gz


## ensure PATH is correct

(if studio is in /opt/android-studio, and SDKs etc under ~/Android/Sdk):

```
ANDROID_STUDIO_LOC=/opt/android-studio
ANDROID_SDK_ROOT=~/Android/Sdk
PATH=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_STUDIO_LOC/bin:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools:$PATH
```

## run Android studio

`/opt/android-studio/bin/studio.sh` \
(if it's not on PATH)

## Use sdkmanager, avdmanager

The command-line options do NOT follow typical conventions. e.g. "-h" doesn't get you help, it *has* to be `--help`; it's "`--list_installed`", not "`--list-installed`"

install platform tools, build tools, android platform:

```
yes  | $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager "platform-tools" "build-tools;31.0.0" "platforms;android-31"
```

install system images:

```
yes     | sdkmanager "system-images;android-31;google_apis;x86_64"
```

create device

```
echo no | avdmanager create avd -n avd28 -k "system-images;android-31;google_apis;x86_64"
```

list installed packages

```
sdkmanager --list_installed
```

sdkmanager help

```
sdkmanager --help
```


## Building

From project directory,

- on Mac or Linux: `./gradlew build`
- on Windows: `gradlew.bat build`

(`gradlew` is a wrapper which downloads .jar files etc needed to run Gradle - is intended to be more flexible than forcing devs to download particular .jars etc themselves.)

.apk file ends up in `app/build/outputs/apk/`.

## Other gradle tasks

list available tasks:

```
./gradlew tasks
```


## Install apk file to (currently active) device:

`adb install /path/to/some/file.apk`

Worth checking out <https://developer.android.com/studio/command-line/adb> for the other import adb commands/tasks.

## Run an app on a physical Android device (over usb or wifi)

Use adb qualified names of all apps/packages. If you forget what your qualified app name, but it's installed on the device, then:

```
adb shell pm list packages
```

And then

```
adb shell monkey -p your.app.name -v 1
```

(to be more precise, this runs the app and sends 1 random input to it)

## Debugging using a physical Android device (over usb or wifi)

Over USB:

- Enable USB debugging on phone, see <https://developer.android.com/studio/command-line/adb#Enabling>
- Plug it in, check device is listed when you do `adb devices`

Over wifi:

- see <https://developer.android.com/studio/run/device#wireless>.
- On phone: settings / Developer Options / Wireless debugging / pair device with pairing code -> note down ip, port.
- `adb pair ipaddr:port` using ip and port from previous step
- enter code

### Connect via ssh tunnel

If the Android device is connected to a *remote* computer you can ssh to, where you know an adb server is running, use:

```
ADBPORT=5037; ssh -L 0.0.0.0:${ADBPORT}:localhost:${ADBPORT} me@remotecomputer
```

adb invocations on the local computer will get forwarded to `remotecomputer`; port 5037 is the port adb server listens on.

### When you don't have direct ssh access

May be able to use adb-proxy, written in python (>= 3.7; see <https://github.com/paulo-raca/adb-proxy>). Allows for e.g. ssh "hops", and reverse connections. Simple use, mimicking ssh tunnel above:

- install adb-proxy: `pip install git+https://github.com/paulo-raca/adb-proxy.git`
- on remote computer:
    - connect device to remote computer if needed
    - use `adb devices` to list devices, record device-id
- `adbproxy connect -s some-device-id -J me@othercomputer`