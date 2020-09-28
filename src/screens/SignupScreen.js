import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/authContext';
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { NavigationEvents } from 'react-navigation';
const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage, signin, tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, [])

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm
                headerText="Sign up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign up"
                onSubmit={signup}
            />
            <NavLink
                routeName='Signin'
                text='already a account?'
            ></NavLink>
        </View>
    );

};
SignupScreen.navigationOptions = () => {
    return {
        header: () => false
    };
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginBottom: 250
    },

    link: {
        color: 'blue'
    }
});


export default SignupScreen; 