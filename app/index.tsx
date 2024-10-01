import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { VStack } from "@/components/ui/vstack";
import { Tracks } from "@/constants/Tracks";
import { format } from "date-fns";
import { CircleChevronLeft, CircleChevronRight, CirclePause, CirclePlay, Download, Shuffle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import TrackPlayer, { useProgress, State, useActiveTrack, useIsPlaying } from "react-native-track-player";

export default function Index() {
  const { position, duration } = useProgress();
  const track = useActiveTrack();
  const { playing, bufferingDuringPlay } = useIsPlaying();

  const initTrackPlayer = async () => {
    console.log(Tracks)
    await TrackPlayer.add(Tracks);
  }

  useEffect(() => {
    initTrackPlayer()
  }, [])

  const getTimeLabel = (seconds: number) => format(new Date(seconds * 1000), 'mm:ss');
  const getProgressValue = () => {
    if (duration === 0) return 0;
    return (position / duration) * 100;
  }

  const canSkipNext = async () => {
    const total = Tracks.length
    const index = await TrackPlayer.getActiveTrackIndex() ?? 0
    return index < total
  }

  const canSkipPrevious = async () => {
    const index = await TrackPlayer.getActiveTrackIndex() ?? 0
    return index >= 0
  }

  const skipToNext = async () => {
    if (await canSkipNext()) await TrackPlayer.skipToNext()
  }

  const skipToPrevious = async () => {
    if (await canSkipPrevious()) await TrackPlayer.skipToPrevious()
  }

  return (
    <View>
      <Card className="p-5 rounded-lg m-3">
        <Image
          source={{
            uri: track?.artwork,
          }}
          className="mb-6 h-[340px] w-full rounded-md"
        />
        <VStack space="xs" className="pb-3">
          <Progress value={getProgressValue()} size="md" orientation="horizontal">
            <ProgressFilledTrack />
          </Progress>
          <HStack className="justify-between w-100">
            <Text size="sm">{getTimeLabel(position)}</Text>
            <Text size="sm">{getTimeLabel(duration)}</Text>
          </HStack>
        </VStack>
        <VStack className="mb-5">
          <Heading size="md" className="mb-1">
            {track?.artist}
          </Heading>
          <Text size="sm">
            {track?.title}
          </Text>
        </VStack>
        <Box>
          <HStack className="items-center justify-between">
            <Shuffle size={30} absoluteStrokeWidth/>
            <HStack className="items-center" space="lg">
              <Pressable onPress={skipToPrevious} disabled={!canSkipPrevious}>
                <CircleChevronLeft size={40} absoluteStrokeWidth/>
              </Pressable>
              {
                playing ? 
                <Pressable onPress={() => TrackPlayer.pause()}>
                  <CirclePause size={60} absoluteStrokeWidth/>
                </Pressable>
                : 
                <Pressable onPress={() => TrackPlayer.play()}>
                  <CirclePlay size={60} absoluteStrokeWidth/>
                </Pressable>
              }
              <Pressable onPress={skipToNext} disabled={!canSkipNext}>
                <CircleChevronRight size={40} absoluteStrokeWidth/>
              </Pressable>
            </HStack>
            <Download size={30} absoluteStrokeWidth/>
          </HStack>
        </Box>
      </Card>
    </View>
  );
}
