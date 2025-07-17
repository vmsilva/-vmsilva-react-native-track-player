"use strict";

import { AppRegistry, NativeEventEmitter, Platform } from 'react-native';
import resolveAssetSource from './resolveAssetSource';
import TrackPlayer from "./NativeTrackPlayer.js";
const isAndroid = Platform.OS === 'android';
const emitter = new NativeEventEmitter(TrackPlayer);

// MARK: - Helpers

function resolveImportedAssetOrPath(pathOrAsset) {
  return pathOrAsset === undefined ? undefined : typeof pathOrAsset === 'string' ? pathOrAsset : resolveImportedAsset(pathOrAsset);
}
function resolveImportedAsset(id) {
  return id ? resolveAssetSource(id) ?? undefined : undefined;
}

// MARK: - General API

/**
 * Initializes the player with the specified options.
 *
 * @param options The options to initialize the player with.
 * @see https://rntp.dev/docs/api/functions/lifecycle
 */
export async function setupPlayer(options = {}) {
  return TrackPlayer.setupPlayer(options);
}

/**
 * Register the playback service. The service will run as long as the player runs.
 */
export function registerPlaybackService(factory) {
  if (isAndroid) {
    // Registers the headless task
    AppRegistry.registerHeadlessTask('TrackPlayer', factory);
  } else if (Platform.OS === 'web') {
    factory()();
  } else {
    // Initializes and runs the service in the next tick
    setImmediate(factory());
  }
}
export function addEventListener(event, listener) {
  return emitter.addListener(event, listener);
}

// MARK: - Queue API

/**
 * Adds one or more tracks to the queue.
 *
 * @param tracks The tracks to add to the queue.
 * @param insertBeforeIndex (Optional) The index to insert the tracks before.
 * By default the tracks will be added to the end of the queue.
 */

/**
 * Adds a track to the queue.
 *
 * @param track The track to add to the queue.
 * @param insertBeforeIndex (Optional) The index to insert the track before.
 * By default the track will be added to the end of the queue.
 */

export async function add(tracks, insertBeforeIndex = -1) {
  const resolvedTracks = (Array.isArray(tracks) ? tracks : [tracks]).map(track => ({
    ...track,
    url: resolveImportedAssetOrPath(track.url),
    artwork: resolveImportedAssetOrPath(track.artwork)
  }));
  return resolvedTracks.length < 1 ? undefined : TrackPlayer.add(resolvedTracks, insertBeforeIndex);
}

/**
 * Replaces the current track or loads the track as the first in the queue.
 *
 * @param track The track to load.
 */
export async function load(track) {
  return TrackPlayer.load(track);
}

/**
 * Move a track within the queue.
 *
 * @param fromIndex The index of the track to be moved.
 * @param toIndex The index to move the track to. If the index is larger than
 * the size of the queue, then the track is moved to the end of the queue.
 */
export async function move(fromIndex, toIndex) {
  return TrackPlayer.move(fromIndex, toIndex);
}

/**
 * Removes multiple tracks from the queue by their indexes.
 *
 * If the current track is removed, the next track will activated. If the
 * current track was the last track in the queue, the first track will be
 * activated.
 *
 * @param indexes The indexes of the tracks to be removed.
 */

/**
 * Removes a track from the queue by its index.
 *
 * If the current track is removed, the next track will activated. If the
 * current track was the last track in the queue, the first track will be
 * activated.
 *
 * @param index The index of the track to be removed.
 */

export async function remove(indexOrIndexes) {
  return TrackPlayer.remove(Array.isArray(indexOrIndexes) ? indexOrIndexes : [indexOrIndexes]);
}

/**
 * Clears any upcoming tracks from the queue.
 */
export async function removeUpcomingTracks() {
  return TrackPlayer.removeUpcomingTracks();
}

/**
 * Skips to a track in the queue.
 *
 * @param index The index of the track to skip to.
 * @param initialPosition (Optional) The initial position to seek to in seconds.
 */
export async function skip(index, initialPosition = -1) {
  return TrackPlayer.skip(index, initialPosition);
}

/**
 * Skips to the next track in the queue.
 *
 * @param initialPosition (Optional) The initial position to seek to in seconds.
 */
export async function skipToNext(initialPosition = -1) {
  return TrackPlayer.skipToNext(initialPosition);
}

/**
 * Skips to the previous track in the queue.
 *
 * @param initialPosition (Optional) The initial position to seek to in seconds.
 */
export async function skipToPrevious(initialPosition = -1) {
  return TrackPlayer.skipToPrevious(initialPosition);
}

// MARK: - Control Center / Notifications API

/**
 * Updates the configuration for the components.
 *
 * @param options The options to update.
 * @see https://rntp.dev/docs/api/functions/player#updateoptionsoptions
 */
export async function updateOptions(options = {}) {
  return TrackPlayer.updateOptions({
    ...options,
    android: {
      ...options.android
    },
    icon: resolveImportedAsset(options.icon),
    playIcon: resolveImportedAsset(options.playIcon),
    pauseIcon: resolveImportedAsset(options.pauseIcon),
    stopIcon: resolveImportedAsset(options.stopIcon),
    previousIcon: resolveImportedAsset(options.previousIcon),
    nextIcon: resolveImportedAsset(options.nextIcon),
    rewindIcon: resolveImportedAsset(options.rewindIcon),
    forwardIcon: resolveImportedAsset(options.forwardIcon)
  });
}

/**
 * Updates the metadata of a track in the queue. If the current track is updated,
 * the notification and the Now Playing Center will be updated accordingly.
 *
 * @param trackIndex The index of the track whose metadata will be updated.
 * @param metadata The metadata to update.
 */
export async function updateMetadataForTrack(trackIndex, metadata) {
  return TrackPlayer.updateMetadataForTrack(trackIndex, {
    ...metadata,
    artwork: resolveImportedAssetOrPath(metadata.artwork)
  });
}

/**
 * Updates the metadata content of the notification (Android) and the Now Playing Center (iOS)
 * without affecting the data stored for the current track.
 */
export function updateNowPlayingMetadata(metadata) {
  return TrackPlayer.updateNowPlayingMetadata({
    ...metadata,
    artwork: resolveImportedAssetOrPath(metadata.artwork)
  });
}

// MARK: - Player API

/**
 * Resets the player stopping the current track and clearing the queue.
 */
export async function reset() {
  return TrackPlayer.reset();
}

/**
 * Plays or resumes the current track.
 */
export async function play() {
  return TrackPlayer.play();
}

/**
 * Pauses the current track.
 */
export async function pause() {
  return TrackPlayer.pause();
}

/**
 * Stops the current track.
 */
export async function stop() {
  return TrackPlayer.stop();
}

/**
 * Sets whether the player will play automatically when it is ready to do so.
 * This is the equivalent of calling `TrackPlayer.play()` when `playWhenReady = true`
 * or `TrackPlayer.pause()` when `playWhenReady = false`.
 */
export async function setPlayWhenReady(playWhenReady) {
  return TrackPlayer.setPlayWhenReady(playWhenReady);
}

/**
 * Gets whether the player will play automatically when it is ready to do so.
 */
export async function getPlayWhenReady() {
  return TrackPlayer.getPlayWhenReady();
}

/**
 * Seeks to a specified time position in the current track.
 *
 * @param position The position to seek to in seconds.
 */
export async function seekTo(position) {
  return TrackPlayer.seekTo(position);
}

/**
 * Seeks by a relative time offset in the current track.
 *
 * @param offset The time offset to seek by in seconds.
 */
export async function seekBy(offset) {
  return TrackPlayer.seekBy(offset);
}

/**
 * Sets the volume of the player.
 *
 * @param volume The volume as a number between 0 and 1.
 */
export async function setVolume(level) {
  return TrackPlayer.setVolume(level);
}

/**
 * Sets the playback rate.
 *
 * @param rate The playback rate to change to, where 0.5 would be half speed,
 * 1 would be regular speed, 2 would be double speed etc.
 */
export async function setRate(rate) {
  return TrackPlayer.setRate(rate);
}

/**
 * Sets the queue.
 *
 * @param tracks The tracks to set as the queue.
 * @see https://rntp.dev/docs/api/constants/repeat-mode
 */
export async function setQueue(tracks) {
  return TrackPlayer.setQueue(tracks);
}

/**
 * Sets the queue repeat mode.
 *
 * @param repeatMode The repeat mode to set.
 * @see https://rntp.dev/docs/api/constants/repeat-mode
 */
export async function setRepeatMode(mode) {
  return TrackPlayer.setRepeatMode(mode);
}

// MARK: - Getters

/**
 * Gets the volume of the player as a number between 0 and 1.
 */
export async function getVolume() {
  return TrackPlayer.getVolume();
}

/**
 * Gets the playback rate where 0.5 would be half speed, 1 would be
 * regular speed and 2 would be double speed etc.
 */
export async function getRate() {
  return TrackPlayer.getRate();
}

/**
 * Gets a track object from the queue.
 *
 * @param index The index of the track.
 * @returns The track object or undefined if there isn't a track object at that
 * index.
 */
export async function getTrack(index) {
  return TrackPlayer.getTrack(index);
}

/**
 * Gets the whole queue.
 */
export async function getQueue() {
  return TrackPlayer.getQueue();
}

/**
 * Gets the index of the active track in the queue or undefined if there is no
 * current track.
 */
export async function getActiveTrackIndex() {
  return (await TrackPlayer.getActiveTrackIndex()) ?? undefined;
}

/**
 * Gets the active track or undefined if there is no current track.
 */
export async function getActiveTrack() {
  return (await TrackPlayer.getActiveTrack()) ?? undefined;
}

/**
 * Gets information on the progress of the currently active track, including its
 * current playback position in seconds, buffered position in seconds and
 * duration in seconds.
 */
export async function getProgress() {
  return await TrackPlayer.getProgress();
}

/**
 * Gets the playback state of the player.
 *
 * @see https://rntp.dev/docs/api/constants/state
 */
export async function getPlaybackState() {
  return await TrackPlayer.getPlaybackState();
}

/**
 * Gets the queue repeat mode.
 *
 * @see https://rntp.dev/docs/api/constants/repeat-mode
 */
export async function getRepeatMode() {
  return TrackPlayer.getRepeatMode();
}

/**
 * Retries the current item when the playback state is `State.Error`.
 */
export async function retry() {
  return TrackPlayer.retry();
}

/**
 * acquires the wake lock of MusicService (android only.)
 */
export async function acquireWakeLock() {
  if (!isAndroid) return;
  TrackPlayer.acquireWakeLock();
}

/**
 * acquires the wake lock of MusicService (android only.)
 */
export async function abandonWakeLock() {
  if (!isAndroid) return;
  TrackPlayer.abandonWakeLock();
}

/**
 * get onStartCommandIntent is null or not (Android only.). this is used to identify
 * if musicservice is restarted or not.
 */
export async function validateOnStartCommandIntent() {
  if (!isAndroid) return true;
  return TrackPlayer.validateOnStartCommandIntent();
}
//# sourceMappingURL=trackPlayer.js.map