import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';


import ProfileDetailScreen from './ProfileDetailsScreen.js';
import TrombinoscopeScreen from './Trombinoscope.js';
import ProfilePage from './ProfilePage.js';
import DeveloppementScreen from './DeveloppementScreen.js';
import AdminPanel from './AdminPanel.js';
import isAdmin from '../Components/isAdmin.js';

import { Ionicons } from '@expo/vector-icons';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DashboardPage from './DashboardPage.js';
import { useAppContext } from '../AppContext';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function DisconnectionButton({ route })
{
  const { setIsSignedIn } = route.params || {};

  const {
    appColor,
  } = useAppContext();

  const dynamicStyles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logOut: {
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 5,
      backgroundColor: appColor,
      padding: 10,
      width: "50%",
      height: "7%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20,
      textAlign: 10,
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <TouchableOpacity
        onPress={() => {
          route.params.setIsSignedIn(false);
        }}
        style={dynamicStyles.logOut}
      >
        <Text style={[dynamicStyles.text, { textAlign: 'center' }]}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ProfileStack({ route }) {
  return (
    <Stack.Navigator initialRouteName="Trombinoscope">
      <Stack.Screen name="All members" component={TrombinoscopeScreen}
        initialParams={
          {
            access_token: route.params,
          }
        }
      />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
    </Stack.Navigator>
  );
}

export default function DrawerMenu({ navigation, apiUser, setIsSignedIn}) {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const {
    appColor,
    setAppColor,
  } = useAppContext();

  useEffect(() => {
    async function checkAdminStatus() {
      const isAdminResult = await isAdmin(apiUser);
      setIsAdminUser(isAdminResult);
    }
    checkAdminStatus();
  }, [apiUser]);

  return (
    <NavigationContainer style={styles.container}>
      <Drawer.Navigator initialRouteName="trombinoscope" screenOptions={{
        drawerActiveTintColor: appColor,
        drawerInactiveTintColor: "#ccc",
      }}>
        <Drawer.Screen name="Trombinoscope" component={ProfileStack}
          initialParams={apiUser}
          options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons

                  name={focused ? "people" : "people-outline"}
                  size={size}
                  color={focused ? appColor : '#ccc'}
                />
              ),
            }} />
        <Drawer.Screen name="Profile" component={ProfilePage}
          initialParams={[apiUser, 74]}
          options={
            {
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="person"
                  size={size}
                  color={focused ? appColor : '#ccc'}
                />
              ),
            }} />
        <Drawer.Screen name="Notifications" component={DeveloppementScreen}
          options={
            {
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="ios-notifications"
                  size={size}
                  color={focused ? appColor : '#ccc'}
                />
              ),
            }} />
        <Drawer.Screen name="Dashboard" component={DashboardPage}
          options={
            {
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="grid"
                  size={size}
                  color={focused ? appColor : '#ccc'}
                />
              ),
            }} />
        <Drawer.Screen name="Chat" component={DeveloppementScreen}
          options={
            {
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="chatbubbles"
                  size={size}
                  color={focused ? appColor : '#ccc'}
                />
              ),
            }} />
        <Drawer.Screen name="Calendar" component={DeveloppementScreen}
          options={
            {
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="calendar"
                  size={size}
                  color={focused ? appColor : '#ccc'}
                />
              ),
            }} />
        <Drawer.Screen
          name="Settings"
          component={DisconnectionButton}
          initialParams={{ setIsSignedIn: setIsSignedIn }}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="settings"
                size={size}
                color={focused ? appColor : '#ccc'}
              />
            ),
          }}
        />
        { isAdminUser === true ?
          <Drawer.Screen
            name="Admin Panel"
            component={AdminPanel}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="color-wand"
                  size={size}
                  color={focused ? appColor : '#ccc'}
                />
              ),
            }}
          />
        : null }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = ({
  container: {
    flex: 1,
    backgroundColor: '#E5E7E6',
  },
});