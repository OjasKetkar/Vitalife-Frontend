const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

// @desc    Get user's goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });

  res.status(200).json(goals);
});

// @desc    Get user's goal
// @route   GET /api/goals/:id
// @access  Private
const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check the logged in user matches the goal user
  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not Authorised');
  }

  res.status(200).json(goal);
});

// @desc    Create user's goal
// @route   POST /api/goals
// @access  Private
const createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    user: req.user._id,
    text,
  });

  res.status(201).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check the logged in user matches the goal user
  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not Authorised');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check the logged in user matches the goal user
  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not Authorised');
  }

  await goal.remove();

  res.status(200).json({ _id: req.params.id, success: true });
});

module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
};