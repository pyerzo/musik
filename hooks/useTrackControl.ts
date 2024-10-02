import { useEffect, useState } from "react";
import TrackPlayer, { Track } from "react-native-track-player"

export const useTrackControl = (track?: Track) => {
  const [control, setControl] = useState<{
    next: boolean
    previous: boolean
  }>({next: false, previous: false})
  
  const goNext = () => TrackPlayer.skipToNext()
  const goPrevious = () => TrackPlayer.skipToPrevious()
  
  useEffect(() => {
    (async () => {
      if (!track) return
      const index = await TrackPlayer.getActiveTrackIndex() ?? 0;
      const queue = await TrackPlayer.getQueue()
      setControl({
        next: index < queue.length - 1,
        previous: index > 0
      })
    })();
  }, [track])

  return { control, goNext, goPrevious }

}