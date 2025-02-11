import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import { NavigationProp } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
  
    try {
      // Step 1: Send Login Request
      const loginResponse = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          'login-form-type': 'pwd',
          'token': 'true',
        }),
      });
  
      if (!loginResponse.ok) {
        throw new Error('Invalid credentials');
        console.error('Failed to login');
        //specific error

      }
  
      const loginData = await loginResponse.json();
      const token = loginData.token; // Extract token
  
      // Step 2: Fetch User Details from SCIM API
      const userResponse = await fetch('https://www.myidp.ibm.com/scim/Me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
  
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await userResponse.json();
      console.log('User Info:', userData);
  
      Alert.alert('Success', 'Logged in successfully');
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        Alert.alert('Login Failed', error.message);
      } else {
        Alert.alert('Login Failed', 'An unknown error occurred');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Register')}>Don't have an account? Sign up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '40%',
    height: 40,
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    width: '40%',
  },
});
