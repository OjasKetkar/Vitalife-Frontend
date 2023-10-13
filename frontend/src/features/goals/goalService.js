import axios from 'axios'

const API_URL = '/api/goals/'

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, goalData, config)

  return response.data
}

// Get user goals
const getGoals =  (token) => {
  
}

// Delete user goal
const deleteGoal =  (goalId, token) => {

}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
}

export default goalService
