import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Disc3, Settings, SquareLibrary } from 'lucide-react-native';
import PressableIcon from '@/components/ui/PressableIcon';
import Icon from '@/components/ui/Icon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const getIconOpacity = (focused: boolean) => focused ? 1 : 0.5

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
            <Icon
              icon={Disc3}
              opacity={getIconOpacity(focused)}
              // size=""
              color={color} 
            />  
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarShowLabel: false,
          headerRight: () => (
            <PressableIcon
              icon={Settings}
              style={{marginRight: 15}}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              icon={SquareLibrary}
              opacity={getIconOpacity(focused)}
              // size="xl"
              color={color} 
            />            
          ),
        }}
      />
    </Tabs>
  );
}
