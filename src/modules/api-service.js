const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080';

const getAllItems = () => fetch(`${baseUrl}/api/items`);

module.exports = {
  getAllItems,
};
