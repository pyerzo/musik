import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { VStack } from "@/components/ui/vstack";
import { Tracks } from "@/constants/Tracks";
import { useTrackControl } from "@/hooks/useTrackControl";
import { getProgressValue, getTimeLabel } from "@/utils/player";
import { CircleChevronLeft, CircleChevronRight, CirclePause, CirclePlay, ListMusic, Shuffle, SkipBack, SkipForward } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable } from "react-native";
import TrackPlayer, { useProgress, useActiveTrack, useIsPlaying } from "react-native-track-player";

export default function Index() {
  const track = useActiveTrack();
  const { position, duration } = useProgress();
  const { playing } = useIsPlaying();
  const { control, goNext, goPrevious} = useTrackControl(track)

  useEffect(() => {
    TrackPlayer.add(Tracks)
  }, [Tracks]);

  return (
    <View>
      <Card className="p-5 rounded-lg m-3">
        <Image
          alt="artwork"
          source={{ uri: track?.artwork }}
          className="mb-6 h-[340px] w-full rounded-md"
        />
        <VStack space="md" className="pb-3">
          <Progress value={getProgressValue(position, duration)} size="md" orientation="horizontal">
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
          <Text size="sm">
            {track?.artist}
          </Text>
        </VStack>
        <Box>
          <HStack className="items-center justify-between">
            <Shuffle size={25} absoluteStrokeWidth/>
            <HStack className="items-center" space="lg">
              <Pressable disabled={!control.previous} onPress={goPrevious}>
                <SkipBack size={35} opacity={control.previous ? 1 : 0.5} absoluteStrokeWidth/>
              </Pressable>
              <Pressable onPress={() => playing ? TrackPlayer.pause() : TrackPlayer.play()}>
                {playing ? 
                  <CirclePause size={60} absoluteStrokeWidth/> 
                  : <CirclePlay size={60} absoluteStrokeWidth/> 
                }
              </Pressable>
              <Pressable disabled={!control.next} onPress={goNext}>
                <SkipForward size={35 } opacity={control.next ? 1 : 0.5} absoluteStrokeWidth />
              </Pressable>
            </HStack>
            <ListMusic size={30} absoluteStrokeWidth/>
          </HStack>
        </Box>
      </Card>
    </View>
  );
}
