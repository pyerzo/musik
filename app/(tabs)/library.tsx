import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Tracks } from "@/constants/Tracks";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Download, EllipsisVertical, HardDriveDownload, Play, Shuffle, User } from "lucide-react-native";

export default function Library() {
  const colorScheme = useColorScheme();

  return (  
    <View style={{flex: 1}}>
      <Box style={{backgroundColor: Colors[colorScheme ?? 'light'].background}} className="px-5 py-8">
        <HStack className="items-center justify-between" space="md">
          <Play absoluteStrokeWidth/>
          <HStack space="xl">
            <Shuffle absoluteStrokeWidth/>
            <HardDriveDownload absoluteStrokeWidth/>
          </HStack>          
        </HStack>
      </Box>
      <Divider/>
      <ScrollView>
        {Tracks.map((track) => (
          <Box key={track.id} style={{backgroundColor: Colors[colorScheme ?? 'light'].background}} className="justify-between">
            <HStack className="m-4 mb-1 items-center justify-between" space="md">
              <HStack space="md">
                <Avatar size="md" style={{borderRadius: 5, backgroundColor: Colors[colorScheme ?? 'light'].background}}>
                  <AvatarImage
                    source={{
                      uri: track.artwork,
                    }}
                  />
                </Avatar>
                <VStack>
                  <Heading size="sm">{track.title}</Heading>
                  <HStack className="items-center">
                    <User size="12" absoluteStrokeWidth strokeWidth={0.5}/>
                    <Text size="sm">{track.artist}</Text>
                  </HStack>
                </VStack>
              </HStack>
              <Download absoluteStrokeWidth/>
            </HStack>
            <Divider className="mt-3"/>
          </Box>        
        ))}
      </ScrollView>
    </View>
  )
}