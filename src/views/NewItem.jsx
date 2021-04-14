import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewItem } from '../modules/api-service';

import SnackBar from '../components/SnackBar';
import ImageSlot from '../components/ImageSlot';

const NewItem = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [itemImages, setItemImages] = useState([]);
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [season, setSeason] = useState('');
  const [error, setError] = useState(false);

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
      const response = await addNewItem(newItem);
      if (response.ok) {
        setError(false);
        history.push({
          pathname: '/items',
          state: {
            isValid: true,
            validationMessage: 'Your item has been successfully added.',
          },
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
        <div className="form__img--container">
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={title} slot="1" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={title} slot="2" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={title} slot="3" />
        </div>
        <select className="form__input" value={gender} onChange={handleGenderChange}>
          <option value="">Select gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
          <option value="mixed">Mixed</option>
        </select>
        <select className="form__input" value={size} onChange={handleSizeChange}>
          <option value="">Select size</option>
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
          <option value="9 months">9 months</option>
        </select>
        <select className="form__input" value={category} onChange={handleCategoryChange}>
          <option value="">Select category</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="sets">Sets</option>
        </select>
        <select className="form__input" value={season} onChange={handleSeasonChange}>
          <option value="">Select category</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
        </select>
        <div className="btn__container">
          <button className="btn btn__secondary" type="button" onClick={() => history.goBack()}>Cancel</button>
          <button className="btn btn__primary" type="submit">Save</button>
        </div>
      </form>
      {error && <SnackBar state={error} setState={setError} type="error" message="There has been an error." />}
    </>
  );
};

export default NewItem;
