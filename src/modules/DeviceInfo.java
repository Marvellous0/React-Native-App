package com.authassessment;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    DeviceInfoModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    @ReactMethod
    public void getDeviceInfo(Promise promise) {
        try {
            WritableMap deviceInfo = Arguments.createMap();
            
            // Get battery level
            IntentFilter iFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
            Intent batteryStatus = reactContext.registerReceiver(null, iFilter);
            
            int level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            
            float batteryPct = level * 100 / (float)scale;
            
            // Get device model
            String deviceModel = Build.MODEL;
            
            deviceInfo.putDouble("batteryLevel", batteryPct);
            deviceInfo.putString("deviceModel", deviceModel);
            
            promise.resolve(deviceInfo);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}