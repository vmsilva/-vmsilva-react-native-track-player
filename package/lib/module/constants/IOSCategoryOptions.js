"use strict";

export let IOSCategoryOptions = /*#__PURE__*/function (IOSCategoryOptions) {
  /**
   * An option that indicates whether audio from this session mixes with audio
   * from active sessions in other audio apps.
   * See https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1616611-mixwithothers
   **/
  IOSCategoryOptions["MixWithOthers"] = "mixWithOthers";
  /**
   * An option that reduces the volume of other audio sessions while audio from
   * this session plays.
   * See https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1616618-duckothers
   **/
  IOSCategoryOptions["DuckOthers"] = "duckOthers";
  /**
   * An option that determines whether to pause spoken audio content from other
   * sessions when your app plays its audio.
   * See https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1616534-interruptspokenaudioandmixwithot
   **/
  IOSCategoryOptions["InterruptSpokenAudioAndMixWithOthers"] = "interruptSpokenAudioAndMixWithOthers";
  /**
   * An option that determines whether Bluetooth hands-free devices appear as
   * available input routes.
   * See https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1616518-allowbluetooth
   **/
  IOSCategoryOptions["AllowBluetooth"] = "allowBluetooth";
  /**
   * An option that determines whether you can stream audio from this session
   * to Bluetooth devices that support the Advanced Audio Distribution Profile (A2DP).
   * See https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1771735-allowbluetootha2dp
   **/
  IOSCategoryOptions["AllowBluetoothA2DP"] = "allowBluetoothA2DP";
  /**
   * An option that determines whether you can stream audio from this session
   * to AirPlay devices.
   * See https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1771736-allowairplay
   **/
  IOSCategoryOptions["AllowAirPlay"] = "allowAirPlay";
  /**
   * An option that determines whether audio from the session defaults to the
   * built-in speaker instead of the receiver.
   * See https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1616462-defaulttospeaker
   **/
  IOSCategoryOptions["DefaultToSpeaker"] = "defaultToSpeaker";
  return IOSCategoryOptions;
}({});
//# sourceMappingURL=IOSCategoryOptions.js.map