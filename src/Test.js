import React, { useState, useStyles } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function Test() {
  const [source, setSource] = useState('');
  function handleTakePhoto (source){
      console.log('Photo taken');
      setSource(source);
  }
  return (
    <div>
        {
            (source)
            ? <img src={source}/>
            : <Camera onTakePhotoAnimationDone={handleTakePhoto}/>
        }
    </div>
  );
}
export default Test;