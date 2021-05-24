import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon, faCamera as camera } from '@fortawesome/free-solid-svg-icons';
import SnackBar from '../validation/SnackBar';

interface ImagesProps {
  state: {
    itemImages: string[],
    setItemImages: any,
  },
  itemTitle: string,
  slot: number,
}

const ImageSlot = (props: ImagesProps) => {
  const { state: { itemImages, setItemImages }, itemTitle, slot } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setImageUrl(itemImages[slot - 1] || '');
    console.log(itemImages)
  }, [itemImages]);

  const addImageUrl = (array: string[], url: string, imageNumber: number) => {
    if (array.length >= 3) {
      setItemImages(array.splice((imageNumber - 1), 1, url));
    } else {
      setItemImages([...itemImages, url]);
    }
  };

  const removeImageUrl = (array: string[], image: string) => {
    const newArray = array.filter(item => item !== image);
    console.log(image)
    setItemImages(newArray);
  };

  const handleDeleteClick = () => {
    removeImageUrl(itemImages, imageUrl);
    setImageUrl('');
  };

  const handleFileChange = (e: any) => {
    const url = 'https://api.cloudinary.com/v1_1/charlies-closet/upload';
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'charlies-images');
    formData.append('file', file);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        addImageUrl(itemImages, data.secure_url, slot - 1);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <>
      {imageUrl === '' && (
        <div className="images__container">
          <input className="form__upload" onChange={handleFileChange} type="file" accept="image/png, image/jpeg" />
          <div className="images__overlay">
            <FontAwesomeIcon icon={camera} className="images__camera" />
            <p className="images__title">Ajouter une image</p>
          </div>
        </div>
      )}
      {imageUrl !== '' && (
        <div className="images__container">
          <img className="images__img" src={imageUrl} alt={itemTitle} />
          <button type="button" onClick={handleDeleteClick}>
            <FontAwesomeIcon className="images__delete" icon={deleteIcon} />
          </button>
        </div>
      )}
      {error && <SnackBar state={error} setState={setError} message="There has been an issue uploading the image" type="error" />}
    </>
  )
};

export default ImageSlot;
