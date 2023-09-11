import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileDetailScreen from './ProfileDetailsScreen.js';
import TrombinoscopeScreen from './Trombinoscope.js';
import ProfilePage from './ProfilePage.js';
import DeveloppementScreen from './DeveloppementScreen.js';

import { Ionicons } from '@expo/vector-icons';
import { Button, View, StyleSheet } from 'react-native';
import WeatherWidget from '../Components/WeatherWidget.js';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function DisconnectionButton({ route })
{
  const { setIsSignedIn } = route.params || {};

  return (
    <View style={styles.container}>
      <Button
        title="Log out"
        type="clear"
        titleStyle={{ color: '#6F9EEB' }}
        onPress={() => { route.params.setIsSignedIn(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

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
  return (
    <NavigationContainer styles={style.container}>
      <Drawer.Navigator initialRouteName="trombinoscope">
        <Drawer.Screen name="Trombinoscope" component={ProfileStack}
          initialParams={apiUser}
          options={
            {
              drawerIcon: ({ focused, size }) => (
                <Ionicons

                  name={focused ? "people" : "people-outline"}
                  size={size}
                  color={focused ? 'blue' : '#ccc'}
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
                  color={focused ? 'blue' : '#ccc'}
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
                  color={focused ? 'blue' : '#ccc'}
                />
              ),
            }} />
        <Drawer.Screen name="Widgets" component={DeveloppementScreen}
          options={
            {
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="grid"
                  size={size}
                  color={focused ? 'blue' : '#ccc'}
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
                  color={focused ? 'blue' : '#ccc'}
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
                  color={focused ? 'blue' : '#ccc'}
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
                color={focused ? 'blue' : '#ccc'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const style = ({
  container: {
    flex: 1,
    backgroundColor: '#E5E7E6',
  },
});