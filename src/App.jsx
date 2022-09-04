import { useEffect, useRef } from 'react';
import './App.css';
import * as faceapi from 'face-api.js'

function App() {
  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

    
  }

  useEffect(()=>{
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ]).then(handleImage)
      .catch((e)=> console.log(e));
    }
    imgRef.current && loadModels();
}, [])

  return (
    <div className="app">
      <h1>React Face Detection APP</h1>
      <img crossOrigin='anonynous' ref={imgRef} src="https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
      <canvas ref={canvasRef}/>
    </div>
  );
}

export default App;
