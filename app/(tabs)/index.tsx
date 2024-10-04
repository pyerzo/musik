import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { VStack } from "@/components/ui/vstack";
import { Colors } from "@/constants/Colors";
import { Tracks } from "@/constants/Tracks";
import { useTrackControl } from "@/hooks/useTrackControl";
import { getProgressValue, getTimeLabel } from "@/utils/player";
import {
  CirclePause,
  CirclePlay,
  ListMusic,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, useColorScheme } from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";

export default function Index() {
  const track = useActiveTrack();
  const colorScheme = useColorScheme();
  const { position, duration } = useProgress();
  const { playing } = useIsPlaying();
  const { control, goNext, goPrevious } = useTrackControl(track);

  useEffect(() => {
    TrackPlayer.add(Tracks);
  }, [Tracks]);

  return (
    <View>
      <Card className="p-5">
        {/* <Image
          alt="artwork"
          // source={{ uri: track?.artwork }}
          source={{ uri: " data:image/webp;base64,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" }}
          className="mb-6 h-[340px] w-full rounded-md"
        /> */}
        <VStack space="md" className="pb-3">
          <Progress
            value={getProgressValue(position, duration)}
            size="md"
            orientation="horizontal"
          >
            <ProgressFilledTrack />
          </Progress>
          <HStack className="justify-between w-100">
            <Text size="sm">{getTimeLabel(position)}</Text>
            <Text size="sm">{getTimeLabel(duration)}</Text>
          </HStack>
        </VStack>
        <VStack className="mb-5">
          <Heading size="md" className="mb-1">
            {track?.title}
          </Heading>
          <Text size="sm">{track?.artist}</Text>
        </VStack>
        <Box>
          <HStack className="items-center justify-between">
            <Shuffle size={25} absoluteStrokeWidth />
            <HStack className="items-center" space="lg">
              <Pressable disabled={!control.previous} onPress={goPrevious}>
                <SkipBack
                  size={35}
                  opacity={control.previous ? 1 : 0.5}
                  absoluteStrokeWidth
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  playing ? TrackPlayer.pause() : TrackPlayer.play()
                }
              >
                {playing ? (
                  <CirclePause size={60} absoluteStrokeWidth />
                ) : (
                  <CirclePlay size={60} absoluteStrokeWidth />
                )}
              </Pressable>
              <Pressable disabled={!control.next} onPress={goNext}>
                <SkipForward
                  size={35}
                  opacity={control.next ? 1 : 0.5}
                  absoluteStrokeWidth
                />
              </Pressable>
            </HStack>
            <ListMusic size={30} absoluteStrokeWidth />
          </HStack>
        </Box>
      </Card>
    </View>
  );
}
