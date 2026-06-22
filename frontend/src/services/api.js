import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getRecommendations = async (isbn) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommend/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recommendations for ${isbn}:`, error);
    throw error;
  }
};
