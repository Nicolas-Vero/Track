import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/authContext';


const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => { tryLocalSignin(); }, []);
  return null
}

export default ResolveAuthScreen;

const styles = StyleSheet.create({

});
