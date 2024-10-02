import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Disc3, Settings, SquareLibrary } from 'lucide-react-native';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Disc3 opacity={focused ? 1 : 0.5} size="xl" color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarShowLabel: false,
          headerRight: () => (
            <Pressable style={{marginRight: 15}}>
              <Settings />
            </Pressable>
          ),
          headerLeft: () => (
            <SquareLibrary style={{marginLeft: 20}}/>
          ),
          tabBarIcon: ({ color, focused }) => (
            <SquareLibrary opacity={focused ? 1 : 0.5} size="lg" color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}
