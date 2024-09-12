// src/components/ImageUpload.tsx
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState, ChangeEvent } from 'react';
import { storage } from '../firebase.ts';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log(`Dodavanje slike: ${progress}%`);
        },
        error => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log("Dokument dostupan na: ", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Dodavanje</button>
      <br />
      {progress > 0 && <p>Dodavanje slike: {progress}%</p>}
      {url && <img src={url} alt="Dodana" />}
    </div>
  );
};

export default ImageUpload;
