[![Build Status](https://travis-ci.org/mircoc/cordova-plugin-settings-hook.svg?branch=master)](https://travis-ci.org/mircoc/cordova-plugin-settings-hook)
[![npm version](https://badge.fury.io/js/cordova-plugin-settings-hook.svg)](https://badge.fury.io/js/cordova-plugin-settings-hook)
[![npm](https://img.shields.io/npm/dm/cordova-plugin-settings-hook.svg)](https://www.npmjs.com/package/cordova-plugin-settings-hook)

# cordova-plugin-settings-hook
Cordova plugin helpful to modify Android and iOS settings with config.xml parameters.

Based on the work of [Devin Jett](https://github.com/djett) and [Diego Netto](https://github.com/diegonetto) on [generator-ionic](https://github.com/diegonetto/generator-ionic) with hook [update_platform_config.js](https://github.com/diegonetto/generator-ionic/blob/master/templates/hooks/after_prepare/update_platform_config.js)
Removed dependency to other npm packages, so it can be installed as a Cordova plugin adding it to your config.xml:
```
<plugin name="cordova-plugin-settings-hook" spec="~0" />
```

This hook updates platform configuration files based on preferences and config-file data defined in config.xml.
Currently only the AndroidManifest.xml and IOS *-Info.plist file are supported.

## Preferences:
1.  Preferences defined outside of the platform element will apply to all platforms
2.  Preferences defined inside a platform element will apply only to the specified platform
3.  Platform preferences take precedence over common preferences
4.  The preferenceMappingData object contains all of the possible custom preferences to date including the
    target file they belong to, parent element, and destination element or attribute
Config Files
1.  config-file elements MUST be defined inside a platform element, otherwise they will be ignored.
2.  config-file target attributes specify the target file to update. (AndroidManifest.xml or *-Info.plist)
3.  config-file parent attributes specify the parent element (AndroidManifest.xml) or parent key (*-Info.plist)
    that the child data will replace or be appended to.
4.  config-file elements are uniquely indexed by target AND parent for each platform.
5.  If there are multiple config-file's defined with the same target AND parent, the last config-file will be used
6.  Elements defined WITHIN a config-file will replace or be appended to the same elements relative to the parent element
7.  If a unique config-file contains multiples of the same elements (other than uses-permssion elements which are
    selected by by the uses-permission name attribute), the last defined element will be retrieved.

## Examples of config.xml:

You have to add some of the following configuration options inside your Cordova project _config.xml_ in the <platform> tag for Android or iOS.

### Android

These configuration will update the generated AndroidManifest.xml for Android platform.

NOTE: For possible manifest values see (http://developer.android.com/guide/topics/manifest/manifest-intro.html)

```
<platform name="android">
    //These preferences are actually available in Cordova by default although not currently documented
    <preference name="android-minSdkVersion" value="8" />
    <preference name="android-maxSdkVersion" value="19" />
    <preference name="android-targetSdkVersion" value="19" />
    //custom preferences examples
    <preference name="android-windowSoftInputMode" value="stateVisible" />
    <preference name="android-installLocation" value="auto" />
    <preference name="android-launchMode" value="singleTop" />
    <preference name="android-activity-hardwareAccelerated" value="false" />
    <preference name="android-manifest-hardwareAccelerated" value="false" />
    <preference name="android-configChanges" value="orientation" />
    <preference name="android-applicationName" value="MyApplication" />
    <preference name="android-theme" value="@android:style/Theme.Black.NoTitleBar" />
    <config-file target="AndroidManifest.xml" parent="/*">
        <supports-screens
            android:xlargeScreens="false"
            android:largeScreens="false"
            android:smallScreens="false" />
        <uses-permission android:name="android.permission.READ_CONTACTS" android:maxSdkVersion="15" />
        <uses-permission android:name="android.permission.WRITE_CONTACTS" />
    </config-file>
</platform>
```
#### Android config-file requirements

If you specify something in the ```<config-file target="AndroidManifest.xml"...```, you need to add android namespace to the xml root, like this:

```
<widget xmlns:android="http://schemas.android.com/apk/res/android" ... >
```
If don't do this you'll get a build error: ```error: Error parsing XML: unbound prefix```.


### iOS

These configuration will update the generated *-Info.plist for iOS platform.

```
<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="UISupportedInterfaceOrientations">
        <array>
            <string>UIInterfaceOrientationLandscapeOmg</string>
        </array>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="SomeOtherPlistKey">
        <string>someValue</string>
    </config-file>
</platform>
```
## Execution

After you added the plugin you can execute `cordova prepare` to change the platform config.
```
$ cordova prepare
Processing settings for platform: android
Wrote AndroidManifest.xml: ../platforms/android/AndroidManifest.xml
Processing settings for platform: ios
Wrote iOS Plist: ../platforms/ios/GamifiveBrazil/MyApp-Info.plist

```


## Note
NOTE: Currently, items aren't removed from the platform config files if you remove them from config.xml.
      For example, if you add a custom permission, build the remove it, it will still be in the manifest.
      If you make a mistake, for example adding an element to the wrong parent, you may need to remove and add your platform,
      or revert to your previous manifest/plist file.

## Todo
TODO: We may need to capture all default manifest/plist elements/keys created by Cordova along with any plugin elements/keys to compare against custom elements to remove.
