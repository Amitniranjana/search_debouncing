// 'use client'
// import React, { useEffect, useState } from 'react'

// import Webcam from "react-webcam";



// const Camera = () => {
//     const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user"
// };
// const [isMounted , setIsMounted]=useState(false);
// const[captureImg , setCaptureImg]=useState('');
// useEffect(()=>{
//     setIsMounted(true);
// },[])

// if(!isMounted){
// return null;
// }
//   return (
//     <div>
//         Camera
// <Webcam
//     audio={false}
//     height={720}
//     screenshotFormat="image/jpeg"
//     width={1280}
//     videoConstraints={videoConstraints}
//   >
//     {({ getScreenshot }) => (
//       <button
//         onClick={() => {
//           const imageSrc = getScreenshot();
//           setCaptureImg(imageSrc)
//         }}
//       >
//         Capture photo
//       </button>
//     )}
//   </Webcam>
//   <img src={captureImg} alt="" />

//   {
//     captureImg &&

//   <button onClick={()=>setCaptureImg('')}>clear Photo</button>
// }

//         </div>

//   )
// }

// export default Camera
"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const Camera = () => {
  // 1. States
  const [isMounted, setIsMounted] = useState(false);
  const [captureImg, setCaptureImg] = useState<string | null>(null); // Use null instead of ''

  // 2. Ref for Webcam
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  // 3. Hydration Fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 4. Clean Capture Function
  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCaptureImg(imageSrc);
      }
    }
  }, [webcamRef]);

  // Prevent SSR Hydration Error
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-12 px-4 sm:px-6">

      {/* Header section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Profile Snapshot
        </h1>
        <p className="mt-2 text-gray-400">Capture your best angle</p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-8">

        {/* Camera Feed Section */}
        <div className="flex flex-col items-center bg-gray-900 p-4 rounded-2xl border border-gray-800 shadow-xl">
          <div className="overflow-hidden rounded-xl w-full aspect-video bg-black relative flex items-center justify-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={capturePhoto}
            className="mt-6 w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-indigo-500/30"
          >
            📸 Capture Photo
          </button>
        </div>

        {/* Captured Preview Section */}
        {captureImg && (
          <div className="flex flex-col items-center bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Preview</h2>

            <div className="relative rounded-xl overflow-hidden border-2 border-indigo-500/50 shadow-2xl">
              <img
                src={captureImg}
                alt="Captured from webcam"
                className="w-full max-w-lg object-cover"
              />
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setCaptureImg(null)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-full transition-colors duration-200"
              >
                Retake
              </button>

              <button
                onClick={() => alert("Photo Saved!")} // Future logic for saving
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-full transition-colors duration-200 shadow-lg shadow-green-500/20"
              >
                Save Photo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Camera;