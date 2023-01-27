<h1><a href="#" id="android-emulator">Setup Android Emulator</a></h1>

<a href="https://cordova.apache.org/docs/en/2.9.0/guide/getting-started/android/" >See Cordova 
Android Platform Guide For More Details</a>

<h2><a href="#" id="environment-variables">Setting Environment Variables</a></h2>

Cordova's CLI tools require some environment variables to be set in order to function correctly. 
The CLI will attempt to set these variables for you, but in certain cases you may need to set them 
manually. The following variables should be updated:

1. Set the `JAVA_HOME` environment variable to the location of your JDK installation
2. Set the `ANDROID_SDK_ROOT` environment variable to the location of your Android SDK installation
3. It is also recommended that you add the Android SDK's `cmdline-tools/latest/bin`, emulator and 
platform-tools directories to your PATH
4. For apksigner and zipalign, the Android SDK's `build-tools` must also be added to your `PATH`

*Note: setting environment variable will differ depending on your Operating System*

```text
ANDROID_SDK_ROOT=/path/to/Android/sdk
PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools/
PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/
PATH=$PATH:$ANDROID_SDK_ROOT/emulator/
```

After, setting our environment variables and add path binaries for the `emulator` and `android cmdline-tools` 
we can create a virtual device using the instructions provided in [Android Platform Guide](https://cordova.apache.org/docs/en/2.9.0/guide/getting-started/android/).
Now we can start the emulator from the cli and run the android device.

<h2><a href="#" id="android-virtual-devices">Create and manage virtual devices</a></h2>

An Android Virtual Device (AVD) is a configuration that defines the characteristics of an Android 
phone, tablet, Wear OS, Android TV, or Automotive OS device that you want to simulate in the [Android 
Emulator](https://developer.android.com/studio/run/emulator). The Device Manager is a tool you can launch from Android Studio that helps you create and 
manage AVDs

The best and easiest way to create a `virtual device` and install `platform tools` is to download and install [Android Studio](https://developer.android.com/studio). 
Launch Android Studio and open the [Device Manager](https://developer.android.com/studio/run/managing-avds.html) to install virtual devices. As 
a side note, you must install [sdk manager](https://developer.android.com/studio/command-line/sdkmanager).


To [Start the emulator from the command line](https://developer.android.com/studio/run/emulator-commandline) we use the 
emulator command with the `-avd` flag, the `android_virtual_device_name` and additional options `-options=value`: 


```bash
# start the emulator virtual device
emulator -avd android_virtual_device_name [ {-option [value]} ... ]
# or
emulator @avd_name [ {-option [value]} ... ]
```

For a list of AVD names, enter the following command:

```bash
# list android virtual devices
emulator -list-avds
```

Update the `package.json` file `scripts` block with:

```json
{
  "scripts": {
    "start-android": "echo 'NODE_ENV=development' | npm run build; cordova build android; cordova emulate android --debug;"
  }
}
```

Run this command to update and start you android application.

*Note: Whether you opened the android emulator from the Device Manager or from the cli, please 
remember to close android emulator when you are done.*




