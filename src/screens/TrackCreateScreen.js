//import '../_mockLocation'

import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/map';
import { withNavigationFocus } from 'react-navigation'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation } = useContext(LocationContext)
  const [err] = useLocation(isFocused, addLocation);
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>TrackCreateScreen</Text>
      <Map />
      <TrackForm />
      {err ? <Text>please enable location service</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});


export default withNavigationFocus(TrackCreateScreen); 