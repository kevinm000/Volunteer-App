const users = [];

const getProfile = (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

const updateProfile = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;

  res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
};

module.exports = { getProfile, updateProfile };
