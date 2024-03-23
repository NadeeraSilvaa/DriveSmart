import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import UserIdContext from '../../context/AuthContext';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';



const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
      { id: 'wifi', icon: 'wifi', label: 'Use Location', type: 'toggle' },
    ],
  },
  {
    header: 'Help',
    items: [
      { id: 'Kyc', icon: 'anchor', label: 'Complete KYC', type: 'link', },
      { id: 'bug', icon: 'alert-triangle', label: 'Report a bug', type: 'link' },
      { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' },
      { id: 'changeP', icon: 'lock', label: 'Change Password', type: 'link' },
    ],
  },

];

const SettingsScreen = () => {

  const { userId } = useContext(UserIdContext);
  const navigation = useNavigation(); // Get navigation object
  //console.log(userId);
  
  const handleLogout=()=>{
    navigation.navigate('Login');
  };
  const handleCompleteKYC = () => {
    navigation.navigate('KYCPAGE'); // Navigate to KYC screen
  };
  const handleChangePass = () => {
    navigation.navigate('changePassword'); // Navigate to KYC screen
  };
  const handleEditProfile = () => {
    navigation.navigate('Edit Profile'); // Navigate to KYC screen
  };
  const [form, setForm] = useState({
    language: 'English',
    darkMode: true,
    wifi: false,
  });
  return (
    <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar} />

          <Text style={styles.profileName}>Nadeera Nirmal</Text>

          <Text style={styles.profileEmail}>{'UUID: '+userId}</Text>

          <TouchableOpacity
            onPress={() => {
              handleEditProfile();
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        if (id === 'Kyc') {
                          handleCompleteKYC(); // Call handleCompleteKYC function
                        }
                        
                        if (id == 'changeP') {
                          handleChangePass();
                        } 
                      }}>
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22} />

                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer} />

                        {type === 'select' && (
                          <Text style={styles.rowValue}>{form[id]}</Text>
                        )}

                        {type === 'toggle' && (
                          <Switch
                            onChange={val => setForm({ ...form, [id]: val })}
                            value={form[id]}
                          />
                        )}

                        {(type === 'select' || type === 'link') && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22} />
                        )}
                      </View>
                    </TouchableOpacity>

                  </View>

                );
              })}
            </View>

          </View>

        ))}
        <TouchableOpacity style={styles.logoutbtn1} onPress={() => {
              handleLogout();
            }}>
          <View style={styles.logoutbtn}>
            <Text style={styles.logoutbtnText}>Log Out</Text>
            <FeatherIcon color="#fff" name="log-out" size={20} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 20,
    paddingBottom: 70,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  logoutbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutbtn1: {
    padding: Spacing * 1,
    backgroundColor: Colors.red,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: Spacing },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    marginHorizontal:60,
  },
  logoutbtnText: {
    marginRight: 8,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.onPrimary,
    textAlign: "center", 
    fontSize: FontSize.large
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
});