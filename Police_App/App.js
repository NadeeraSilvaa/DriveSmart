import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './app/screen/LoginScreen';
import PoliceHome from './app/screen/PoliceHome';
import ViolationReportScreen from './app/screen/ViolationReportScreen';
import ProfileScreen from './app/screen/PoliceOfficerProfile';
import UserIdContext from './context/AuthContext';
import Colors from './app/constants/Colors';


const Stack = createStackNavigator();

export default function App() {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">

          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen 
          name="PoliceHome" 
          component={PoliceHome} 
          options={{
            headerTitle: 'Home',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: 25,
            },
            headerTitleAlign: 'center', // Center align the header title
            headerStatusBarHeight:50,
            headerLeft: null,
          }} />
          <Stack.Screen
            name="ViolationReport"
            component={ViolationReportScreen}
            options={{
              headerTitle: 'Violation Report',
              headerStyle: {
                backgroundColor: Colors.primary, // Change the background color
              },
              headerTitleStyle: {
                color: 'white', // Change the color of the title
                fontSize: 20, // Change the font size of the title
                alignSelf: 'center',
                
              },
               
              headerTitleContainerStyle: {
                marginLeft:'18%', // Add margin to the left of the title
              }
            }} />

          <Stack.Screen 
          name="PoliceProfile" 
          component={ProfileScreen} 
          options={{
            headerTitle: 'Profile',
            headerStyle: {
              backgroundColor: Colors.primary, // Change the background color
            },
            headerTitleStyle: {
              color: 'white', // Change the color of the title
              fontSize: 20, // Change the font size of the title
              alignSelf: 'center',
              
            },
             
            headerTitleContainerStyle: {
              marginLeft:'29%', // Add margin to the left of the title
            }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserIdContext.Provider>
  );
}
