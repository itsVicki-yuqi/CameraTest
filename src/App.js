import React, {useRef, useEffect, useState, useStyles} from "react";
function App() {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const handleCapture = (target) => {
    if(target.files){
      if(target.files.length !== 0){
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  }
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video:{width: 1920, height: 1080}
      })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err =>{
        console.error(err);
      })
  }
  const takePhoto = () =>{
    const width = 400;
    const height = width / (16/9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width,height);
    setHasPhoto(true);

    var data = photo.toDataURL('image/png');
    photoRef.setAttribute('src', data);

    photo.toBlob();
  }
  const closePhoto = () =>{
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  }
  const savePhoto = (blob) => {
    //let a = document.createElement('a');
    //a.href = URL.createObjectURL(blob);
    //a.download = 'screenshot.jpg';
    //document.body.appendChild(a);
    //a.click();
  }
  useEffect(()=>{
    getVideo();

  }, [videoRef]);
  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>SNAP</button>
        <button onClick={savePhoto()}>SAVE</button>
      </div>
      <div className={'result'+(hasPhoto? 'hasPhoto':'')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>Close</button>
        <input
        accept="image/*"
        className={classes.input}
        id = "icon-button-file"
        type = "file"
        capture = "environment"
        onChange = {(e) => handleCapture(e.target)}
        />
      </div>
    </div>
  );
}

export default App;
