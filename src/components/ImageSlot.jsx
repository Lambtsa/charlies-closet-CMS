import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon, faCamera as camera } from '@fortawesome/free-solid-svg-icons';

import SnackBar from './SnackBar';
import Loader from './Loader';

const ImageSlot = props => {
  const {
    itemTitle = '',
    state,
    slot,
  } = props;
  const { itemImages, setItemImages } = state;
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);
  const [deleteToken, setDeleteToken] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setImageUrl(itemImages[slot - 1] || '');
  }, [itemImages]);

  const addImageUrl = (array, url, imageNumber) => {
    if (array.length >= 6) {
      setItemImages(array.splice((imageNumber - 1), 1, url));
    } else {
      setItemImages([...itemImages, url]);
    }
  };

  const removeImageUrl = (array, image) => {
    const newArray = array.filter(item => item !== image);
    setItemImages(newArray);
  };

  const handleFileChange = e => {
    setIsloading(true);
    const url = 'https://api.cloudinary.com/v1_1/charlies-closet/upload';
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'charlies-images');
    formData.append('file', file);
    console.log(formData);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        addImageUrl(itemImages, data.secure_url, slot - 1);
        setDeleteToken(data.delete_token);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsloading(false));
  };

  const handleDeleteClick = () => {
    const url = 'https://api.cloudinary.com/v1_1/charlies-closet/delete_by_token';
    const formData = new FormData();
    formData.append('token', deleteToken);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .catch(() => setError(true));
    removeImageUrl(itemImages, imageUrl);
    setImageUrl('');
  };

  return (
    <>
      <div className="input__img-wrapper">
        {!isLoading && imageUrl !== '' && (
          <>
            <button className="btn__close" type="button" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={deleteIcon} className="icon__delete" />
            </button>
            <img className="input__img" src={imageUrl} alt={itemTitle} />
          </>
        )}
        {!isLoading && imageUrl === '' && (
          <>
            <input className="ImageSlot__input" type="file" onChange={handleFileChange} accept="image/png, image/jpeg" multiple={false} />
            <div className="ImageSlot__overlay">
              <FontAwesomeIcon icon={camera} className="ImageSlot__camera" />
              <p className="ImageSlot__prompt">Add image</p>
            </div>
          </>
        )}
        {isLoading && <Loader />}
      </div>
      {error && <SnackBar state={error} setState={setError} type="error" message="There was an error in uploading your image" />}
    </>
  );
};

export default ImageSlot;
