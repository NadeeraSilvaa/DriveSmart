import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LandingScreen}  from './app/screen/LandingScreen';
import LoginScreen from './app/screen/LoginScreen';
import RegisterScreen from './app/screen/RegisterScreen';
import SettingsScreen from './app/screen/SettingScreen';
import HomeScreen from './app/screen/HomeScreen';
import ForgotPassword from './app/screen/other/ForgotPassword';
import Invoicedata from './app/screen/other/Invoicedata';
import KycUser from './app/screen/KycUser';
import UserIdContext from './context/AuthContext';
import ViolationReportScreen from './app/screen/Police/ViolationReportScreen';
import ProfileScreen from './app/screen/Police/PoliceOfficerProfile';
import EditProfileDriver from './app/screen/EditProfileDriver';
import ChangePassword from './app/screen/other/ChangePassword';

import Colors from './app/constants/Colors';

const Stack = createStackNavigator();

export default function App() {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordForgot" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="AddData" component={Invoicedata} options={{ headerShown: false }} />
          <Stack.Screen name="KYCPAGE" component={KycUser} options={{
            headerTitle: 'KYC for Drivers',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: 25,
            },
            headerTitleAlign: 'center', // Center align the header title
            headerStatusBarHeight:40,
          }} />
          <Stack.Screen name="Edit Profile" component={EditProfileDriver} options={{
            headerTitle: 'Edit Profile',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: 25,
            },
            headerTitleAlign: 'center', // Center align the header title
            headerStatusBarHeight:40,
          }} />
          <Stack.Screen name="changePassword" component={ChangePassword}  options={{ headerShown: false }}/>
          <Stack.Screen name="PoliceHome" component={ViolationReportScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PoliceProfile" component={ProfileScreen}  />
        </Stack.Navigator>
      </NavigationContainer>
    </UserIdContext.Provider>
  );
}
