import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
import axios from "axios";

import { useAppContext } from '../AppContext';

function login_request(email, password, { setIsSignedIn, setApiUser, setIsError })
{
    const url = process.env.REACT_APP_API_URL + '/login';
    const headers = {
        'accept': 'application/json',
        'X-Group-Authorization': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
    };
    const data = {
        email: email.toLowerCas(),
        password: password,
    };

    console.log(url);
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

    const {
        appColor,
        companyName,
    } = useAppContext();

    const color = appColor;
    const dynamicStyles = {
        title: {
            marginTop: 40,
            marginBottom: 10,
            color: appColor,
            fontSize: 35,
            fontWeight: 'bold',
        },
        inputView: {
            backgroundColor: 'white',
            borderRadius: 30,
            borderColor: appColor,
            borderWidth: 1,
            width: "70%",
            height: 45,
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
            backgroundColor: appColor,
        },
        company: {
            fontSize: 40,
            fontWeight: 'bold',
            color: appColor,
            textDecorationLine: 'underline',
        },
    };

    const handleLoginPress = () => {
        login_request(email, password, {setIsSignedIn, setApiUser, setIsError});
        setEmail("");
        setPassword("");
    };

    const [language, setLanguage] = useState('fr');
    const toggleLanguage = () => {
        const newLanguage = language === 'fr' ? 'en' : 'fr';
        setLanguage(newLanguage);
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}></View>
            <Text style={dynamicStyles.company}>
                {language === 'fr' && companyName === "Undefined" ? "Indéfini" : companyName}
            </Text>
            {language === "fr" ? <Text style={dynamicStyles.title}>Connexion au compte</Text> : <Text style={dynamicStyles.title}>Login</Text>}
            <StatusBar style="auto" />
                <View style={dynamicStyles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder={language === "fr" ? "Adresse mail" : "Email"}
                placeholderTextColor="#003f5c"
                textAlign="center"
                value={email}
                multiline={true}
                onChangeText={setEmail}
                onSubmitEditing={handleLoginPress}
                />
            </View>
            <View style={dynamicStyles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder={language === "fr" ? "Mot de passe" : "Password"}
                placeholderTextColor="#003f5c"
                textAlign="center"
                secureTextEntry={password === "" ? false :true}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleLoginPress}
                />
            </View>
            <TouchableOpacity onPress={toggleLanguage}>
                {language === "fr" ? <Text style={styles.forgot_button}>Changer la langue</Text> : <Text style={styles.forgot_button}>Changer </Text> }
            </TouchableOpacity>
            <Text>Langue sélectionnée : {language}</Text>
            <TouchableOpacity style={dynamicStyles.login} onPress={handleLoginPress}>
                {language === "fr" ? <Text style={styles.loginText}>LOGIN</Text> : <Text style={styles.loginText}>CONNEXION</Text> }
            </TouchableOpacity>
            {isError ? (language === "fr" ? (<Text style={styles.errorText}>Incorrect Crediential</Text>) : (<Text style={styles.errorText}>Identifiant ou mot de passe incorrect</Text>)) : null}
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
        height: "60%",
        width: "85%",
        borderRadius: 20,
        position: 'absolute',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    loginLogo: {
        marginBottom: 40,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },
    forgot_button: {
        height: 30,
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
