import React, { useEffect, useRef, useState} from "react";
import { NextPage } from "next";
import Head from "next/head";

const CapturePage: NextPage<CapturePageProps> = ({}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const [streaming, setStreaming] = useState(false);
  
  useEffect(() => {
    if(navigator){
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if(videoRef && videoRef.current){
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          // compatible camera connected, or the user denied access.
          console.log("An Error occurred", err);
        });
    }
  },[]);

  const clearPhoto = () => {
    if(canvasRef && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
      var data = canvasRef.current.toDataURL('image/png');
      
      if(photoRef && photoRef.current){
        photoRef.current.setAttribute("src", data);
      }
    }
  }

  const takePicture = () => {
    if(canvasRef && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = 320;
      canvasRef.current.height = 320;
      
      if(videoRef && videoRef.current) {
        context.drawImage(videoRef.current, 0, 0, 320, 320);
      }
      
      const data = canvasRef.current.toDataURL("image/png");
      if(photoRef && photoRef.current) {
        photoRef.current.setAttribute("src", data);
      }
      else {
        clearPhoto();
      }
    }
  }

  const handleClickCapture = (e: React.MouseEvent) => {
    takePicture();
    setStreaming(true);
    e.preventDefault();
  }

  useEffect(() => {
    if(
      videoRef && 
      videoRef.current &&
      canvasRef &&
      canvasRef.current
    ){
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;

      videoElement.addEventListener("canplay", () => {
        if(!streaming){
          const height = videoElement.videoHeight / (videoElement.videoWidth/320);
          videoElement.setAttribute("width", "320px");
          videoElement.setAttribute("height", height + "px");
          canvasElement.setAttribute("width","320px");
          canvasElement.setAttribute("height",height + "px");
        }
      });
    }
  },[])

  return(
    <>
    <Head>
      <title>video capture page</title>
    </Head>
    <section>
      <article>
        <video ref={videoRef}></video>
        <button onClick={handleClickCapture}>capture</button>
      </article>
      <article>
        <canvas ref={canvasRef} style={{display: "none"}}></canvas>
        <div>
          <img ref={photoRef} alt="The screen capture will appear in this box."></img>
        </div>
      </article>
    </section>
    
    </>
  )
}

interface CapturePageProps {
  
}

export default CapturePage;