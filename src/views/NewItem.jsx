import React, { useState } from 'react';
import { addNewItem } from '../modules/api-service';

import SnackBar from '../components/SnackBar';

const NewItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleTitleChange = e => setTitle(e.target.value);
  const handleDescriptionChange = e => setDescription(e.target.value);
  const handleImageUrlChange = e => setImageUrl(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const newItem = {
        itemTitle: title,
        itemDescription: description,
        itemImages: [imageUrl],
        itemCategory: category,
      };
      const response = await addNewItem(newItem);
      if (response.ok) {
        setError(false);
        setIsValid(true);
      } else {
        setIsValid(false);
        setError(true);
      }
    } catch (err) {
      setIsValid(false);
      setError(true);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <h2 className="form__title">Add new item</h2>
        <input
          className="form__input"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange} />
        <textarea
          className="form__input textarea"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange} />
        <input
          className="form__input"
          type="url"
          placeholder="Enter image url"
          value={imageUrl}
          onChange={handleImageUrlChange} />
        <select className="form__input" value={category} onChange={handleCategoryChange}>
          <option value="">Select category</option>
          <option value="clothes">Clothes</option>
        </select>
        <button className="btn__primary" type="submit">confirm</button>
      </form>
      {error && <SnackBar state={error} setState={setError} type="error" message="There has been an error." />}
      {isValid && <SnackBar state={isValid} setState={setIsValid} type="success" message="The item has successfully been added." />}
    </>
  );
};

export default NewItem;
