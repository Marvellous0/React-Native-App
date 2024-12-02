import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, NativeModules, Platform } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import Button from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { DeviceInfo } from '../types/device';

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { authorize, user, getCredentials } = useAuth0();
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        batteryLevel: 0,
        deviceModel: Platform.OS === 'ios' ? 'iOS Device' : 'Android Device'
    });

    useEffect(() => {
        if (user) {
            navigation.navigate('Profile');
        }
    }, [user, navigation]);

    const handleLogin = async () => {
        try {
            await authorize();
            const credentials = await getCredentials();
            console.log(credentials, 'credentials')
            if (credentials) {
                console.log('Access Token:', credentials.accessToken);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to Auth Assessment</Text>
            <View style={styles.deviceInfo}>
                <Text>Battery Level: {deviceInfo.batteryLevel}%</Text>
                <Text>Device Model: {deviceInfo.deviceModel}</Text>
            </View>
            <Button onPress={handleLogin} title="Login with Auth0" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcome: {
        fontSize: 24,
        marginBottom: 20,
    },
    deviceInfo: {
        marginVertical: 20,
    },
});

export default HomeScreen;