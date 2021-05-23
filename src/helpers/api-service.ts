const baseApiUrl = process.env.NODE_ENV === 'production'
  ? 'https://api.stockholm-family.com/api'
  : 'http://localhost:8080/api';

export default baseApiUrl;