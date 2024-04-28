import React, { useRef, useState } from 'react';
import { Button, DrawerLayoutAndroid, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import layoutStyles from '../css/layout';

const App = () => {
  const drawer = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    drawer.current.openDrawer();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    drawer.current.closeDrawer();
    setDrawerOpen(false);
  };

  const navigateTo = (screen) => {
    // Navigation logic here
    console.log(`Navigating to ${screen}`);
  };

  const navigationView = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Home')}>
        <Icon name="home" size={20} color="#000" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Add admin')}>
        <Icon name="user-plus" size={20} color="#000" />
        <Text style={styles.menuText}>Add admin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Student registration request')}>
        <Icon name="user-plus" size={20} color="#000" />
        <Text style={styles.menuText}>Student registration request</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Departements')}>
        <Icon name="building" size={20} color="#000" />
        <Text style={styles.menuText}>Departements</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Classes')}>
        <Icon name="graduation-cap" size={20} color="#000" />
        <Text style={styles.menuText}>Classes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Subjects')}>
        <Icon name="book" size={20} color="#000" />
        <Text style={styles.menuText}>Subjects</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Student review')}>
        <Icon name="users" size={20} color="#000" />
        <Text style={styles.menuText}>Student review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Notice')}>
        <Icon name="bell" size={20} color="#000" />
        <Text style={styles.menuText}>Notice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={closeDrawer}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
      drawerBackgroundColor="#fff"
      drawerLockMode={drawerOpen ? 'locked-open' : 'unlocked'}
    >
      <View style={styles.container}>
        <Text>Content goes here</Text>
        {/* Content of your main screen */}
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
};
