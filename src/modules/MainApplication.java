// ... other imports
import com.authassessment.DeviceInfoPackage; // Add this import

public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Add the DeviceInfoPackage
            packages.add(new DeviceInfoPackage());
            return packages;
        }
        // ... rest of the class
    };
}