import axios from 'axios';

const API_URL = '/api/goals/';

const createGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goal, config);

  return response.data;
};

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const updateGoal = async (text, _id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${_id}`, { text }, config);

  return response.data;
};

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${goalId}`, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};

export default goalService;
