import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { ReactMic } from 'react-mic';
import WebCam from './WebCam';
import '../css/user.css';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { BsFillStopCircleFill } from 'react-icons/bs';
import axios from 'axios';

export default function AnyComponent({question , toggleQuestion, num , toggleNum}) {
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const onStop = async () => {

    const data = {
      question : question,
      reponse : transcription
    }

    console.log(data)

    stopSpeechToText();
    
    if(num === 2) {
        try {
          const response = await axios.post('http://127.0.0.1:3001/second', data);
          toggleQuestion(response.data.processedResponse[0])
          toggleNum(3)
        } catch (error) {
          console.error('Erreur lors de envoie', error);
        }
    }
    else if(num ===3) {
        try {
          const response = await axios.post('http://127.0.0.1:3001/third', data);
          console.log(response.data.processedResponse[0])
          toggleQuestion(response.data.processedResponse[0])
          toggleNum(4)
        } catch (error) {
          console.error('Erreur lors de envoie', error);
        }
    }
   else if(num === 4) {
      try {
        const response = await axios.post('http://127.0.0.1:3001/third', data);
        console.log(response.data.processedResponse[0])
        toggleQuestion(response.data.processedResponse[0])
        toggleNum(6)
      } catch (error) {
        console.error('Erreur lors de envoie', error);
      }
   }
  //  else if(num === 5) {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:3001/fourth', data);
  //     console.log(response.data.processedResponse[0])
  //     toggleQuestion(response.data.processedResponse[0])
  //     toggleNum(6)
  //   } catch (error) {
  //     console.error('Erreur lors de envoie', error);
  //   }
  //  }
   else if(num === 6) {
    try {
      const response = await axios.post('http://127.0.0.1:3001/five', data);
      console.log(response.data.processedResponse[0])
      toggleQuestion(response.data.processedResponse[0])
      toggleNum(8)
    } catch (error) {
      console.error('Erreur lors de envoie', error);
    }
   }
  //  else if(num === 7) {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:3001/six', data);
  //     console.log(response.data.processedResponse[0])
  //     toggleQuestion(response.data.processedResponse[0])
  //     toggleNum(7)
  //   } catch (error) {
  //     console.error('Erreur lors de envoie', error);
  //   }
  //  }
   else if(num === 8) {
    try {
      const response = await axios.post('http://127.0.0.1:3001/suggestion', data);
      console.log(response.data.processedResponse[0])
      toggleQuestion(response.data.processedResponse[0])
      toggleNum(0)
    } catch (error) {
      console.error('Erreur lors de envoie', error);
    }
   }
  }
  

  const [transcription , setTransciption] = useState('')

  useEffect(() => {
    results.map(item => setTransciption(prevtranscription => prevtranscription +  item.transcript + " "))
  } , [results])


  if (error) return <p style={{ marginTop: '100px' }}>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className='user-speak'>
      <WebCam />
      <div className='sound'>
        <ReactMic
          record={isRecording}
          className='sound-wave'
          backgroundColor='#007bff'
          strokeColor='white'
        />
        {!isRecording ? (
          <BsFillPlayCircleFill onClick={startSpeechToText} className='icone' />
        ) : (
          <BsFillStopCircleFill onClick={() => onStop()} className='icone' />
        )}
      </div>
    </div>
  );
}
