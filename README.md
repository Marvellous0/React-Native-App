# Auth0 React Native Sample App

## React Native vs React Web Architecture

### Core Architectural Differences

1. **Rendering Layer**
   - **React Web**: Uses the DOM (Document Object Model) and renders to HTML elements
   - **React Native**: Uses native components and bridges to platform-specific UI elements
     - `<div>` becomes `<View>`
     - `<p>` becomes `<Text>`
     - No direct HTML or CSS usage

2. **Threading Model**
   - **React Web**: Single-threaded, runs on the main browser thread
   - **React Native**: Three main threads
     - Main Thread (Native UI)
     - JavaScript Thread (Business Logic)
     - Shadow Thread (Layout Calculations)

3. **Bridge Communication**
   - **React Web**: Direct DOM manipulation
   - **React Native**: JavaScript Bridge
     - Serializes data between native and JS environments
     - Asynchronous communication
     - Batches updates for performance

### Styling Differences

1. **CSS vs StyleSheet**
   - **React Web**: Uses CSS with full feature set
   - **React Native**: Uses JavaScript StyleSheet objects
     - Subset of CSS properties
     - No inheritance (except for Text components)
     - No cascading     ```javascript
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         backgroundColor: '#fff'
       }
     });     ```

2. **Layout System**
   - **React Web**: Flexbox, Grid, and traditional layout models
   - **React Native**: Primarily Flexbox
     - Always defaults to `flex-direction: column`
     - No float or positioning like web

### Platform-Specific Considerations

1. **Navigation**
   - **React Web**: Browser history API, URL routing
   - **React Native**: Stack-based navigation
     - No URL-based routing
     - Platform-specific navigation patterns

2. **Performance**
   - **React Web**: Browser optimizations, V8 engine
   - **React Native**: 
     - Native performance for UI components
     - JavaScript runs in separate thread
     - Bridge can be a bottleneck for heavy data

3. **Development Experience**
   - **React Web**: Hot reloading, browser dev tools
   - **React Native**: 
     - Metro bundler
     - Platform-specific debugging tools
     - Native development kit requirements

### Code Example Comparison

javascript
// React Web
import React from 'react';
function WebComponent() {
return (
<div className="container">
<p>Hello Web</p>
</div>
);
}

// React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
function NativeComponent() {
return (
<View style={styles.container}>
<Text>Hello Native</Text>
</View>
);
}


## Project Setup

1. Install dependencies:

2. Configure Auth0:
   - Create an Auth0 application
   - Update auth0-configuration.ts with your credentials
   - Configure callback URLs

3. Run the app:
   - `npm run web` for web
   - `npm run ios` or `npm run android` for native

## Best Practices

1. **Performance**
   - Minimize bridge crossing
   - Use native components when possible
   - Implement proper memory management

2. **Security**
   - Secure token storage
   - Proper authentication flow
   - Protected API calls

3. **User Experience**
   - Platform-specific patterns
   - Smooth animations
   - Proper error handling

# Android-Specific Considerations in React Native

## Configuration & Setup

1. **Build Configuration**
   ```gradle:android/app/build.gradle
   android {
       defaultConfig {
           minSdkVersion rootProject.ext.minSdkVersion
           targetSdkVersion rootProject.ext.targetSdkVersion
           // Important for Auth0 and deep linking
           manifestPlaceholders = [
               auth0Domain: "your-domain.auth0.com",
               auth0Scheme: "${applicationId}.auth0"
           ]
       }
   }
   ```

2. **Permissions**
   ```xml:android/app/src/main/AndroidManifest.xml
   <manifest>
       <!-- Common Android permissions -->
       <uses-permission android:name="android.permission.INTERNET" />
       <uses-permission android:name="android.permission.CAMERA" />
       <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
   </manifest>
   ```

## Performance Considerations

1. **Memory Management**
   - Android devices have varying memory constraints
   - Use `enableProguardInReleaseBuilds` for production builds
   - Implement proper image caching and lazy loading
   ```gradle
   def enableProguardInReleaseBuilds = true
   ```

2. **APK Size Optimization**
   - Enable Hermes JavaScript engine
   - Use Android App Bundle (AAB) for distribution
   - Split APKs by architecture
   ```gradle
   def enableSeparateBuildPerCPUArchitecture = true
   ```

## Platform-Specific Features

1. **Back Button Handling**
   ```typescript
   import { BackHandler } from 'react-native';

   useEffect(() => {
       const backHandler = BackHandler.addEventListener(
           'hardwareBackPress',
           () => {
               // Handle back button press
               return true; // Prevent default behavior
           }
       );

       return () => backHandler.remove();
   }, []);
   ```

2. **Material Design Components**
   ```typescript
   // Use Android-specific props
   <TouchableNativeFeedback
       background={TouchableNativeFeedback.Ripple('#000000', true)}
       useForeground={true}>
       <View style={styles.button}>
           <Text>Android Ripple Effect</Text>
       </View>
   </TouchableNativeFeedback>
   ```

## Common Issues & Solutions

1. **Release Signing**
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file(MYAPP_RELEASE_STORE_FILE)
               storePassword MYAPP_RELEASE_STORE_PASSWORD
               keyAlias MYAPP_RELEASE_KEY_ALIAS
               keyPassword MYAPP_RELEASE_KEY_PASSWORD
           }
       }
   }
   ```

2. **Deep Linking**
   ```xml
   <activity>
       <intent-filter>
           <action android:name="android.intent.action.VIEW" />
           <category android:name="android.intent.category.DEFAULT" />
           <category android:name="android.intent.category.BROWSABLE" />
           <data
               android:host="your-domain.auth0.com"
               android:pathPrefix="/android/${applicationId}/callback"
               android:scheme="${applicationId}.auth0" />
       </intent-filter>
   </activity>
   ```

## Development Tools

1. **Android Debug Bridge (ADB)**
   ```bash
   # Common ADB commands
   adb devices                    # List connected devices
   adb logcat                     # View logs
   adb shell input keyevent 82   # Open dev menu
   ```

2. **Metro Bundler Configuration**
   ```javascript:metro.config.js
   module.exports = {
       transformer: {
           getTransformOptions: async () => ({
               transform: {
                   experimentalImportSupport: false,
                   inlineRequires: true,
               },
           }),
       },
   };
   ```

## Testing Considerations

1. **Device Testing**
   ```typescript
   import { Platform } from 'react-native';

   const isAndroid = Platform.OS === 'android';
   const androidAPILevel = Platform.Version;

   // Version-specific code
   if (isAndroid && androidAPILevel < 23) {
       // Handle older Android versions
   }
   ```

2. **Automated Testing**
   ```javascript
   // Using Detox for E2E testing
   describe('Android specific tests', () => {
       it('should handle back button correctly', async () => {
           await device.pressBack();
           await expect(element(by.id('homeScreen'))).toBeVisible();
       });
   });
   ```

## Publishing & Distribution

1. **Play Store Requirements**
   ```gradle
   android {
       defaultConfig {
           versionCode 1
           versionName "1.0.0"
           // Required for Android 12+
           targetSdkVersion 31
       }
   }
   ```

2. **Build Types**
   ```gradle
   android {
       buildTypes {
           release {
               minifyEnabled enableProguardInReleaseBuilds
               proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
           }
           staging {
               initWith release
               matchingFallbacks = ['release']
           }
       }
   }
   ```

## Best Practices

1. **Resource Management**
   - Use appropriate image formats (WebP for Android)
   - Implement proper lifecycle management
   - Handle configuration changes

2. **UI/UX Guidelines**
   - Follow Material Design guidelines
   - Implement proper navigation patterns
   - Handle different screen sizes and densities

3. **Security**
   - Implement proper keystore management
   - Use Android Keychain for sensitive data