const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080';

const getAllItems = () => fetch(`${baseUrl}/api/items`);

const getItemById = itemId => fetch(`${baseUrl}/api/items/${itemId}`);

module.exports = {
  getAllItems,
  getItemById,
};
