class MediaConnection implements Media {
  constructor(){
    
  }

  getMedia(cb: (streamArg) => void) {
    if(navigator) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      .then(cb)
      // TODO 에러 처리 상세화
      .catch(e => console.error("Error accessing media devices: ",e))
    }
  }
}

export interface Media {
  getMedia: (cb: (streamArg) => void) => void;
}

export default MediaConnection;