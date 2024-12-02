import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from '../components/Button';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Profile'
>;

interface ProfileScreenProps {
    navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const { user, clearSession } = useAuth0();

    const handleLogout = async () => {
        try {
            await clearSession();
            navigation.replace('Home');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) {
        navigation.replace('Home');
        return null;
    }

    return (
        <View style={styles.container}>
            {user.picture && (
                <Image
                    source={{ uri: user.picture }}
                    style={styles.profileImage}
                />
            )}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <Button
                title="Logout"
                variant="secondary"
                onPress={handleLogout}
                style={styles.logoutButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 40,
    },
    infoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    logoutButton: {
        marginTop: 20,
    },
});

export default ProfileScreen;