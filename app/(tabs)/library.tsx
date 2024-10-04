import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import Icon from "@/components/ui/Icon";
import PressableIcon from "@/components/ui/PressableIcon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { VStack } from "@/components/ui/vstack";
import { Colors } from "@/constants/Colors";
import { Tracks } from "@/constants/Tracks";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Download,
  HardDriveDownload,
  Play,
  Shuffle,
  User,
} from "lucide-react-native";
import { ScrollView } from "react-native";

export default function Library() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Box
        style={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
        className="px-5 py-4"
      >
        <HStack className="items-center justify-between" space="md">
          <PressableIcon icon={Play}/>
          <HStack space="xl">
            <PressableIcon icon={Shuffle} />
            <PressableIcon icon={HardDriveDownload} />
          </HStack>
        </HStack>
      </Box>
      <Divider />
      <ScrollView>
        {Tracks.map((track) => (
          <Box
            key={track.id}
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
            className="justify-between"
          >
            <HStack
              className="mx-4 my-2 items-center justify-between"
              space="xs"
            >
              <HStack space="md">
                <Avatar
                  size="md"
                  style={{
                    borderRadius: 2,
                    borderColor: 'white',
                    borderWidth: 2
                  }}
                >
                  {/* <AvatarImage
                    source={{
                      uri: track.artwork,
                    }}
                  /> */}
                </Avatar>
                <VStack>
                  <Heading size="sm">{track.title}</Heading>
                  <HStack className="items-center">
                    <Icon icon={User} size="15" absoluteStrokeWidth strokeWidth={0.5} />
                    <Text size="sm">{track.artist}</Text>
                  </HStack>
                </VStack>
              </HStack>
              <PressableIcon icon={Download} />
            </HStack>
            <Divider />
          </Box>
        ))}
      </ScrollView>
    </View>
  );
}
