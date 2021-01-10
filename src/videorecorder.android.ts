import { Application } from "@nativescript/core";

const DEFAULT_FRAMERATE = 30;
const DEFAULT_BITRATE = 10000000;

const FALLBACK_QUALITY_LEVELS = [
  android.media.CamcorderProfile.QUALITY_HIGH,
  android.media.CamcorderProfile.QUALITY_2160P,
  android.media.CamcorderProfile.QUALITY_1080P,
  android.media.CamcorderProfile.QUALITY_720P,
  android.media.CamcorderProfile.QUALITY_480P
];

export class VideoRecorder {
  private recordingVideoFlag = false;

  private mediaRecorder;

  private videoSize;

  private sceneView;
  private videoCodec;
  private videoDirectory;
  private videoBaseName;
  private videoPath;
  private bitRate = DEFAULT_BITRATE;
  private frameRate = DEFAULT_FRAMERATE;
  private encoderSurface;


  constructor() {
    this.recordingVideoFlag = false;
  }


  static fromFragment(fragment: com.google.ar.sceneform.ux.ArFragment) {
    const videoRecorder = new VideoRecorder();
    videoRecorder.setSceneView(fragment.getArSceneView());
    return videoRecorder;
  }

  public setSceneView(sceneView: com.google.ar.sceneform.ArSceneView): void {
    this.sceneView = sceneView;
  }


  public getVideoPath(): any {
    return this.videoPath;
  }

  public setBitRate(bitRate: number): void {
    this.bitRate = bitRate;
  }

  public setFrameRate(frameRate: number): void {
    this.frameRate = frameRate;
  }

  public onToggleRecord(): boolean {
    if (this.recordingVideoFlag) {
      this.stopRecordingVideo();
    } else {
      this.startRecordingVideo();
    }
    return this.recordingVideoFlag;
  }

  public startRecordingVideo(): void {

    if (this.recordingVideoFlag) {
      throw "already recording";
    }


    if (this.mediaRecorder == null) {
      this.mediaRecorder = new android.media.MediaRecorder();
    }

    this.videoPath = null;

    try {
      this.buildFilename();
      this.setUpMediaRecorder();
    } catch (e) {
      console.error(e);
      throw "Exception setting up recorder";
    }

    // Set up Surface for the MediaRecorder
    this.encoderSurface = this.mediaRecorder.getSurface();

    this.sceneView.startMirroringToSurface(
        this.encoderSurface, 0, 0, this.videoSize.getWidth(), this.videoSize.getHeight());

    this.recordingVideoFlag = true;
  }

  private buildFilename(): void {
    if (this.videoDirectory == null) {
      this.videoDirectory =
          new java.io.File(
              android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES)
              + "/ARVideos");
    }
    if (this.videoBaseName == null) {
      this.videoBaseName = "Sample";
    }
    this.videoPath =
        new java.io.File(
            this.videoDirectory, this.videoBaseName + java.lang.Long.toHexString(java.lang.System.currentTimeMillis()) + ".mp4");
    const dir = this.videoPath.getParentFile();
    if (!dir.exists()) {
      dir.mkdirs();
    }
  }

  public stopRecordingVideo(): void {

    if (!this.recordingVideoFlag) {
      throw "not recording";
    }
    // UI
    this.recordingVideoFlag = false;

    if (this.encoderSurface != null) {
      this.sceneView.stopMirroringToSurface(this.encoderSurface);
      this.encoderSurface = null;
    }
    // Stop recording
    this.mediaRecorder.stop();
    this.mediaRecorder.reset();
  }

  private setUpMediaRecorder(): void {

    this.mediaRecorder.setVideoSource(android.media.MediaRecorder.VideoSource.SURFACE);
    this.mediaRecorder.setOutputFormat(android.media.MediaRecorder.OutputFormat.MPEG_4);

    this.mediaRecorder.setOutputFile(this.videoPath.getAbsolutePath());
    this.mediaRecorder.setVideoEncodingBitRate(this.bitRate);
    this.mediaRecorder.setVideoFrameRate(this.frameRate);
    this.mediaRecorder.setVideoSize(this.videoSize.getWidth(), this.videoSize.getHeight());
    this.mediaRecorder.setVideoEncoder(this.videoCodec);

    this.mediaRecorder.prepare();

    try {
      this.mediaRecorder.start();
    } catch (e) {
      console.error("Exception starting capture: " + e.getMessage());
    }
  }

  public setVideoSize(width: number, height: number): void {
    this.videoSize = new android.util.Size(width, height);
  }

  public setVideoQualityAuto(): void {

    const orientation = Application.android.context.getResources().getConfiguration().orientation;
    this.setVideoQuality(android.media.CamcorderProfile.QUALITY_2160P, orientation);
  }

  public setVideoQuality(quality: number, orientation: number): void {
    let profile = null;

    if (android.media.CamcorderProfile.hasProfile(quality)) {
      profile = android.media.CamcorderProfile.get(quality);
    }

    if (profile == null) {
      for (let level of FALLBACK_QUALITY_LEVELS) {
        if (android.media.CamcorderProfile.hasProfile(level)) {
          profile = android.media.CamcorderProfile.get(level);
          console.log(">> profile found: " + profile);
          break;
        }
      }
    }

    if (profile == null) {
      return;
    }

    if (orientation === android.content.res.Configuration.ORIENTATION_LANDSCAPE) {
      this.setVideoSize(profile.videoFrameWidth, profile.videoFrameHeight);
    } else {
      // noinspection JSSuspiciousNameCombination
      this.setVideoSize(profile.videoFrameHeight, profile.videoFrameWidth);
    }
    this.setVideoCodec(profile.videoCodec);
    this.setBitRate(profile.videoBitRate);
    this.setFrameRate(profile.videoFrameRate);
  }

  public setVideoCodec(videoCodec: number): void {
    this.videoCodec = videoCodec;
  }

  public isRecording(): boolean {
    return this.recordingVideoFlag;
  }

}
