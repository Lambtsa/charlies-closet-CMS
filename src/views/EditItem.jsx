import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { updateItemById, getItemById, deleteItemById } from '../modules/api-service';

import SnackBar from '../components/SnackBar';
import ImageSlot from '../components/ImageSlot';

const EditItem = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [itemImages, setItemImages] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [season, setSeason] = useState('');
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      const response = await getItemById(id);
      const data = await response.json();
      setTitle(data.itemTitle);
      setDescription(data.itemDescription);
      setItemImages(data.itemImages);
      setGender(data.itemGender);
      setSize(data.itemSize);
      setCategory(data.itemCategory);
      setSeason(data.itemSeason);
    } catch (err) {
      setError(true);
    }
  }, []);

  const handleTitleChange = e => setTitle(e.target.value);
  const handleDescriptionChange = e => setDescription(e.target.value);
  const handleGenderChange = e => setGender(e.target.value);
  const handleSizeChange = e => setSize(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleSeasonChange = e => setSeason(e.target.value);

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const newItem = {
        itemTitle: title,
        itemDescription: description,
        itemImages,
        itemGender: gender,
        itemSize: size,
        itemCategory: category,
        itemSeason: season,
      };
      const response = await updateItemById(id, newItem);
      if (response.ok) {
        setError(false);
        history.push({
          pathname: '/items',
          // state: {
          //   isValid: true,
          //   validationMessage: 'Your item has been successfully added.',
          // },
        });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await deleteItemById(id);
      if (response.ok) {
        setError(false);
        history.push({
          pathname: '/items',
          // state: {
          //   isValid: true,
          //   validationMessage: 'Your item has been successfully added.',
          // },
        });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <h2 className="form__title">Add new item</h2>
        <label className="form__label" htmlFor="title">
          Title
          <input
            id="title"
            className="form__input"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange} />
        </label>
        <label className="form__label" htmlFor="description">
          Description
          <textarea
            id="description"
            className="form__input textarea"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={handleDescriptionChange} />
        </label>
        <div className="form__img--container">
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={title} slot="1" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={title} slot="2" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={title} slot="3" />
        </div>
        <label className="form__label" htmlFor="gender">
          Gender
          <select id="gender" className="form__input" value={gender} onChange={handleGenderChange}>
            <option value="">Select gender</option>
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>
        <label className="form__label" htmlFor="size">
          Size
          <select id="size" className="form__input" value={size} onChange={handleSizeChange}>
            <option value="">Select size</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="9 months">9 months</option>
          </select>
        </label>
        <label className="form__label" htmlFor="category">
          Category
          <select id="category" className="form__input" value={category} onChange={handleCategoryChange}>
            <option value="">Select category</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="sets">Sets</option>
          </select>
        </label>
        <label className="form__label" htmlFor="season">
          Season
          <select id="season" className="form__input" value={season} onChange={handleSeasonChange}>
            <option value="">Select season</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
          </select>
        </label>
        <div className="btn__container">
          <button className="btn btn__delete" type="button" onClick={handleDeleteClick}>Delete</button>
          <div className="btn__container--right">
            <button className="btn btn__secondary" type="button" onClick={() => history.goBack()}>Cancel</button>
            <button className="btn btn__primary" type="submit">Save</button>
          </div>
        </div>
      </form>
      {error && <SnackBar state={error} setState={setError} type="error" message="There has been an error." />}
    </>
  );
};

export default EditItem;
