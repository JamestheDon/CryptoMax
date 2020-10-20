# Ledger Max

> React Native project

## I

- A Bitcoin Position

- positions are individual records of each Bitcoin purchase you have made.

- all records are stored unencrypted, inside local device storage (asynce storage).

- The goal of ledger max is to give you a more complete perspective on the performance of your Bitcoin.

- Ledger Max does not aim to store any Bitcoin it is purly a tool to help you manange it.

-

## Setup

Install dependencies

```
yarn install
```

# Ios

```
cd ios && pod install && cd ..
```

Run the project

```
react-native run-ios
```

# Android ( [5/5/2020]: not updated to RN 0.62.2)

```
react-native run-android
```

### Troubleshooting

There seems to be an issue with the debug keystore generation when running react-native run-android, if you get the error "Keystore file '/Project-Folder/android/app/debug.keystore' not found for signing config 'debug'"
download [the original keystore](https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore)
file from the official template and put it in `android/app`.  
See [this issue](https://github.com/facebook/react-native/issues/25629) for more information.
