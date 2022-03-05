// https://www.youtube.com/watch?v=BPUgM1Ig4Po

import { useEffect, useRef, useState } from 'react';
import './App.css';
import styles from './styles/Home.module.css';

const App = () => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [image]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      {preview && console.log(typeof preview, typeof image, preview, image)}
      <form>
        {preview ? (
          <img src={preview} alt='preview' style={{ objectFit: 'cover' }} onClick={() => setImage(undefined)} />
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current?.click();
            }}
          >
            Add Image
          </button>
        )}
        <input
          type='file'
          style={{ display: 'none' }}
          ref={fileInputRef}
          accept='image/*'
          onChange={(event) => {
            if (event.target.files) {
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === 'image') {
                setImage(file);
              } else {
                setImage(undefined);
              }
            }
          }}
        />
      </form>
    </div>
  );
};

export default App;
