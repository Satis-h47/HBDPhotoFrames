import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ForwardArrow from '../assets/svg/ForwardArrow';

function CustomDrawerContent({ state, descriptors, navigation }) {
  const activeRoute = state.routeNames[state.index];

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.drawerGroup}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];

          const icon = options.drawerIcon
            ? options.drawerIcon({ focused, color: focused ? '#007AFF' : '#333', size: 24 })
            : null;

          const isLastItem = index === state.routes.length - 1;

          return (
            <View key={route.key}>
              <TouchableOpacity
                onPress={() => navigation.navigate(route.name)}
                style={styles.drawerItem}
              >
                <View style={styles.left}>
                  {icon && <View style={styles.icon}>{icon}</View>}
                  <Text style={styles.label}>{route.name}</Text>
                </View>
                <ForwardArrow />
              </TouchableOpacity>

              {!isLastItem && (
                <View style={styles.divider} />
              )}
            </View>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  drawerGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    // margin: 16, // Optional: space from drawer edge
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 45,
    // marginRight: 16,
  },
});

export default CustomDrawerContent;
