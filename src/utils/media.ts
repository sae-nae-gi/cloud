// 음성, 영상 데이터를 채집함.
class MediaConnection implements Media {
  stream: MediaStream;

  getStream() {
    return this.stream;
  }

  async getMedia() {
    if (navigator) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      }
      catch (error) {
        this.stream = new MediaStream();
        // TODO 에러 처리 상세화
        console.error("Error accessing media devices: ", error)
      }
    }
  }
}

export interface Media {
  getStream: () => MediaStream;
  getMedia: () => void;
}

export default MediaConnection;