import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/authContext';
import { NavigationEvents } from 'react-navigation';
const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(Context);
    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm
                headerText='Sign in to your account'
                errorMessage={state.errorMessage}
                onSubmit={signin}
                submitButtonText='Sign in' />

            <NavLink
                routeName='Signup'
                text='dont have a ccount'
            />
        </View>
    );
};

SigninScreen.navigationOptions = {
    header: () => false,
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginBottom: 250
    }
});


export default SigninScreen; 