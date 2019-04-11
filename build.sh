#!/usr/bin/env bash

## Bundle Android
bundleAndroid() {
    react-native link
    react-native bundle \
        --reset-cache \
        --platform android \
        --dev false \
        --entry-file index.js \
        --bundle-output android/app/src/main/assets/index.android.bundle \
        --assets-dest android/app/src/main/res

    # pushd android > /dev/null
    #     ./gradlew assembleDebug
    # popd > /dev/null
}

## Run Android
runAndroid() {
    react-native run-android --no-packager
}

## Bundle IOS
bundleIos() {
    react-native link
    react-native bundle \
        --reset-cache \
        --platform ios \
        --dev false \
        --entry-file index.js \
        --bundle-output ios/receipt/main.jsbundle \
        --assets-dest ios
}

## Run IOS
runIos() {
    react-native run-ios --no-packager --configuration Release --simulator="iPhone 6s"
}

# Bundle and run android
if [[ "$2" == "android" ]]; then
    if [[ "$1" == "bundle" || "$1" == "run" ]]; then
        bundleAndroid
    fi
    if [[ "$1" == "run" ]]; then
        runAndroid
    fi
fi

# Bundle and run ios
if [[ "$2" == "ios" ]]; then
    if [[ "$1" == "bundle" || "$1" == "run" ]]; then
        bundleIos
    fi
    if [[ "$1" == "run" ]]; then
        runIos
    fi
fi
