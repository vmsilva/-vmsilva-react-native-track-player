"use strict";

import { useEffect, useState } from 'react';
import { getProgress } from "../trackPlayer.js";
import { Event } from "../constants/index.js";
import { useTrackPlayerEvents } from "./useTrackPlayerEvents.js";
const INITIAL_STATE = {
  position: 0,
  duration: 0,
  buffered: 0
};

/**
 * Poll for track progress for the given interval (in miliseconds)
 * @param updateInterval - ms interval
 */
export function useProgress(updateInterval = 1000) {
  const [state, setState] = useState(INITIAL_STATE);
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], () => {
    setState(INITIAL_STATE);
  });
  useEffect(() => {
    let mounted = true;
    const update = async () => {
      try {
        const {
          position,
          duration,
          buffered
        } = await getProgress();
        if (!mounted) return;
        setState(currentState => position === currentState.position && duration === currentState.duration && buffered === currentState.buffered ? currentState : {
          position,
          duration,
          buffered
        });
      } catch {
        // these method only throw while you haven't yet setup, ignore failure.
      }
    };
    const poll = async () => {
      await update();
      if (!mounted) return;
      await new Promise(resolve => setTimeout(resolve, updateInterval));
      if (!mounted) return;
      poll();
    };
    poll();
    return () => {
      mounted = false;
    };
  }, [updateInterval]);
  return state;
}
//# sourceMappingURL=useProgress.js.map