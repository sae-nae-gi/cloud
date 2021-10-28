class MediaConnection implements Media {
  stream: MediaStream;

  async getMedia(cb: (streamArg) => void) {
    if(navigator) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        cb(this.stream);
      }
      catch (error) {
        // TODO 에러 처리 상세화
        console.error("Error accessing media devices: ",error)
      }
    }
  }
}

export interface Media {
  getMedia: (cb: (streamArg) => void) => void;
}

export default MediaConnection;