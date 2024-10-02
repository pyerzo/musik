import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import TrackPlayer from 'react-native-track-player';

SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => require('./service'));

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({});
  const [trackPlayerLoaded, setTrackPlayerLoaded] = useState(false)

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
    (async() => {
      await TrackPlayer.setupPlayer()
      setTrackPlayerLoaded(true)
    })();
  }, [loaded]);

  if (!loaded || !trackPlayerLoaded) return;

  return (
    <GluestackUIProvider mode="system">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        </ThemeProvider>
    </GluestackUIProvider>
  );
}
