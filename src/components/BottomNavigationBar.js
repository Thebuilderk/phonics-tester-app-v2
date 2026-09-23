import React, { useState } from 'react';
import navigationData from '../data/navigationData';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomNavigationBarStyles from '../styles/BottomNavigationBarStyles';

const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState('Home'); // Default active tab

  const renderNavItem = (item) => {
    const isActive = activeTab === item.label;
    return (
      <TouchableOpacity
        key={item.id}
        style={BottomNavigationBarStyles.touchableNavItem}
        onPress={() => setActiveTab(item.label)}
      >
        <Text style={[BottomNavigationBarStyles.navIcon, isActive && BottomNavigationBarStyles.activeNavIcon]}>
          {item.icon}
        </Text>
        <Text style={[BottomNavigationBarStyles.navText, isActive && BottomNavigationBarStyles.activeNavText]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={BottomNavigationBarStyles.container}>
      {navigationData.map(item => renderNavItem(item))}
    </View>
  );
};

const styles = BottomNavigationBarStyles;

export default BottomNavigationBar;
