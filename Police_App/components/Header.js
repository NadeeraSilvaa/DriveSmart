// Header.js
import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../app/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Header = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between', 
                padding: 3 , 
                backgroundColor:Colors.primary,
                height:70,
                padding:10,
                 }}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <FeatherIcon color="#fff" name="menu" size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <FeatherIcon color="#fff" name="user" size={40} />
                </TouchableOpacity>

            </View>
            <StatusBar />

        </SafeAreaView>
        

    );
};

export default Header;
