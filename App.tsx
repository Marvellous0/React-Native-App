/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Auth0 from 'react-native-auth0';

import config from './auth0-configuration';
const auth0 = new Auth0(config);

const App = () => {

    let [accessToken, setAccessToken] = useState<string | null>(null);
    let [userInfo, setUserInfo] = useState<any>(null);

    const getUserInfo = async (token: string) => {
        try {
            const response = await auth0.auth.userInfo({ token });
            setUserInfo(response);
        } catch (error) {
            console.log('User info error:', error);
        }
    };

    const onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email',
            })
            .then(credentials => {
                setAccessToken(credentials.accessToken);
                getUserInfo(credentials.accessToken);
            })
            .catch(error => console.log(error));
    };

    const onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(() => {
                setAccessToken(null);
                setUserInfo(null);
                Alert.alert('Logged out!');
            })
            .catch(() => {
                console.log('Log out cancelled');
            });
    };

    let loggedIn = accessToken !== null;
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Auth0Sample - Login </Text>
            {userInfo && (
                <Text style={styles.welcome}>
                    Welcome, {userInfo.name || userInfo.email}!
                </Text>
            )}
            <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
            <Button onPress={loggedIn ? onLogout : onLogin}
                title={loggedIn ? 'Log Out' : 'Log In'} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#2196F3'
    }
});

export default App;