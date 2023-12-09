import Webcam from 'react-webcam';
import React from 'react';

function WebCam() {

    const webcamRef = React.useRef(null);

    const videoConstraints = {
      width: 500,
      height: 600,
    };
  
    return(
        <div>
            <Webcam
            audio={false}
            ref={webcamRef}
            mirrored={true}
            videoConstraints={videoConstraints}
        />
        </div>
    )
}

export default WebCam