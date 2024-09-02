// src/components/ImageUpload.tsx
import React, { useState, ChangeEvent } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig'; // Adjust the import path if needed

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
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {progress > 0 && <p>Upload progress: {progress}%</p>}
      {url && <img src={url} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;
