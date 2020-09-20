import React, { useState, useEffect } from 'react';
import AsyncStore from '@react-native-community/async-storage';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';

import api from '../services/api';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');
    useEffect(() => {
        AsyncStore.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user });
            }
        });
    }, []);

    async function handleLogin() {
        const response = await api.post('/devs', { username: user })
        const { _id } = response.data;
        await AsyncStore.setItem('user', _id);
        navigation.navigate('Main', { user: _id });
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enable={Platform.OS === 'ios'}
            style={styles.container}>
            <Image source={logo} />
            <TextInput
                autoCapital="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="#999"
                value={user}
                onChangeText={setUser}
                placeholder="Digite seu usuário no Github" />
            <TouchableOpacity
                onPress={() => handleLogin()}
                style={styles.button}>
                <Text style={styles.text}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})

