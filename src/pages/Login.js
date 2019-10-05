import React, {useState, useEffect} from "react";
import {
    View, 
    Text, 
    KeyboardAvoidingView, 
    Image, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    AsyncStorage
} from "react-native";

import api from "../services/api";

import logo from "../assets/logo.png";

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    function logonAgain(){
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate("List");
            }
        })
    }
    
    async function handleSubmit(){
        const response = await api.post('/sections', {
            email
        });

        const { _id } = response.data;

        await AsyncStorage.setItem("user", _id);
        await AsyncStorage.setItem("techs", techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={loginStyle.container}>
            <Image source={logo} />

            <View style={loginStyle.form}>
                <Text style={loginStyle.label}>Seu E-mail *</Text>

                <TextInput  
                    style={loginStyle.input}
                    placeholder={"Seu e-mail"}
                    placeholderTextColor="#999"
                    keyboardType={"email-address"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={loginStyle.label}>Tecnologias *</Text>

                <TextInput  
                    style={loginStyle.input}
                    placeholder={"Tecnologias de interesse"}
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={loginStyle.button}>
                    <Text style={loginStyle.buttonText}>Procurar Spots</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={logonAgain} style={loginStyle.logon}>
                    <Text style={loginStyle.logonText}>Logar novamente</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8,
    },

    input: {    
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    logon:{
        backgroundColor: "#f95a59",
        height: 42,
        marginTop: 5,
    },

    logonText:{
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlignVertical: "center"
    }
});