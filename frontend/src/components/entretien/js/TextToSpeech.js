import React, { useState, useEffect } from "react";
import { ReactMic } from 'react-mic';

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setIsPaused(true);
    synth.speak(u);
    setIsPaused(false);

    return () => {
      synth.cancel();
    };
  }, [text]);

  return (
    <div>
        <ReactMic
          record={isPaused}
          className='sound-wave'
          backgroundColor='#007bff'
          strokeColor='white'
        />
    </div>
  );
};

export default TextToSpeech;