import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import axios from "axios";

function login_request(email, password, { setIsSignedIn, setApiUser, setIsError })
{
    const url = 'https://masurao.fr/api/employees/login';
    const headers = {
        'accept': 'application/json',
        'X-Group-Authorization': 'AhSyHQjIpPhIvfI5OU8HHe9nyhPKwY-q',
        'Content-Type': 'application/json',
    };
    const data = {
        email: email,
        password: password,
    };

    axios.post(url, data, { headers })
    .then((response) => {
        console.log('Réponse de l\'API:', response.data);
        console.log(response.status);
        if (response.status === 200) {
            setApiUser(response.data);
            setIsSignedIn(true);
            setIsError(false);
        }
    })
    .catch((error) => {
        setIsError(true);
        console.log(error);
    });
}

export default function LoginPage({ setIsSignedIn, setApiUser })
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleLoginPress = () => {
        console.log("Email:", email);
        console.log("Password:", password);
        login_request(email, password, {setIsSignedIn, setApiUser, setIsError});
        setEmail("");
        setPassword("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}></View>
            <Text style={styles.title}>LOGIN</Text>
            <StatusBar style="auto" />
                <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="#003f5c"
                value={email}
                onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.login} onPress={handleLoginPress}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            {isError ? (<Text style={styles.errorText}>Incorrect username or password</Text>) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: "white",
        height: "45%",
        width: "85%",
        borderRadius: 20,
        position: 'absolute',
    },
    title: {
        marginBottom: 10,
        color: '#6F9EEB',
        fontSize: 35,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    loginLogo: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: 'white',
        borderRadius: 30,
        borderColor: '#6F9EEB',
        borderWidth: 1,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
    },
    forgot_button: {
        height: 30,
        marginBottom: 20,
    },
    login: {
        width:"80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#6F9EEB",
    },
    loginText: {
        color: 'white',
    },
    rectangle: {
        position: 'absolute',
        width: "85%",
        height: "85%",
        backgroundColor: 'rgba(211, 211, 211, 1)',
        borderRadius: 10,
    },
});
