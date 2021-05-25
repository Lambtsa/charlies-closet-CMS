import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon, faCamera as camera } from '@fortawesome/free-solid-svg-icons';

import SnackBar from './validation/SnackBar';

const ImageSlot = (props: any) => {
  const {
    itemTitle = '',
    state,
    slot,
  } = props;
  const { itemImages, setItemImages } = state;
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setImageUrl(itemImages[slot - 1] || '');
    /* eslint-disable-next-line */
  }, [itemImages]);

  const addImageUrl = (array: any, url: any, imageNumber: any) => {
    if (array.length >= 6) {
      setItemImages(array.splice((imageNumber - 1), 1, url));
    } else {
      setItemImages([...itemImages, url]);
    }
  };

  const removeImageUrl = (array: any, image: any) => {
    const newArray = array.filter((item: any) => item !== image);
    setItemImages(newArray);
  };

  const handleFileChange = (e: any) => {
    const url = 'https://api.cloudinary.com/v1_1/dnxtp3xmi/upload';
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'trading-app');
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

  const handleDeleteClick = () => {
    removeImageUrl(itemImages, imageUrl);
    setImageUrl('');
  };

  return (
    <>
      {imageUrl !== '' && (
        <div className="ImageSlot__container">
          <button className="btn__close" type="button" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={deleteIcon} className="icon__delete" />
          </button>
          <img className="ImageSlot__img" src={imageUrl} alt={itemTitle} />
        </div>
      )}
      {imageUrl === '' && (
        <div className="ImageSlot__input-wrapper">
          <input className="ImageSlot__input" type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
          <div className="ImageSlot__overlay">
            <FontAwesomeIcon icon={camera} className="ImageSlot__camera" />
            <p className="ImageSlot__prompt">Add image</p>
          </div>
        </div>
      )}
      {error && <SnackBar state={error} setState={setError} type="error" message="There was an error in uploading your image" />}
    </>
  );
};

export default ImageSlot;
