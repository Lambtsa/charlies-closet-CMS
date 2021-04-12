const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080';

const getAllItems = () => fetch(`${baseUrl}/api/items`);

const getItemById = itemId => fetch(`${baseUrl}/api/items/${itemId}`);

const addNewItem = itemObj => fetch(`${baseUrl}/api/items`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(itemObj),
});

const updateItemById = (itemId, itemObj) => fetch(`${baseUrl}/api/items/${itemId}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(itemObj),
});

const deleteItemById = itemId => fetch(`${baseUrl}/api/items/${itemId}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
  },
});

module.exports = {
  getAllItems,
  getItemById,
  addNewItem,
  updateItemById,
  deleteItemById,
};
