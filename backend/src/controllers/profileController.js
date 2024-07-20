let profiles = [
  {
    id: 1,
    fullName: 'John Doe',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    skills: ['Communication', 'Teamwork'],
    preferences: 'Prefers outdoor activities',
    availability: ['2023-08-15', '2023-09-20'],
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    address1: '456 Elm St',
    address2: '',
    city: 'Othertown',
    state: 'NY',
    zipCode: '10001',
    skills: ['Leadership', 'Time Management'],
    preferences: 'Likes working with children',
    availability: ['2023-10-10', '2023-11-15'],
  },
  {
    id: 3,
    fullName: 'Alice Johnson',
    address1: '789 Maple Ave',
    address2: 'Suite 5C',
    city: 'Somecity',
    state: 'TX',
    zipCode: '73301',
    skills: ['Problem Solving', 'Creativity'],
    preferences: 'Enjoys community outreach programs',
    availability: ['2023-12-01', '2023-12-15'],
  },
];

const getAllProfiles = (req, res) => {
  res.json(profiles);
};

const getProfileById = (req, res) => {
  const profile = profiles.find(p => p.id === parseInt(req.params.id));
  if (!profile) return res.status(404).send('Profile not found');
  res.json(profile);
};

const createProfile = (req, res) => {
  const profile = {
    id: profiles.length + 1,
    fullName: req.body.fullName,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    skills: req.body.skills,
    preferences: req.body.preferences,
    availability: req.body.availability,
  };
  profiles.push(profile);
  res.status(201).json(profile);
};

const updateProfile = (req, res) => {
  const profile = profiles.find(p => p.id === parseInt(req.params.id));
  if (!profile) return res.status(404).send('Profile not found');

  profile.fullName = req.body.fullName;
  profile.address1 = req.body.address1;
  profile.address2 = req.body.address2;
  profile.city = req.body.city;
  profile.state = req.body.state;
  profile.zipCode = req.body.zipCode;
  profile.skills = req.body.skills;
  profile.preferences = req.body.preferences;
  profile.availability = req.body.availability;

  res.json(profile);
};

const deleteProfile = (req, res) => {
  const profileIndex = profiles.findIndex(p => p.id === parseInt(req.params.id));
  if (profileIndex === -1) return res.status(404).send('Profile not found');

  const deletedProfile = profiles.splice(profileIndex, 1)[0];
  res.json(deletedProfile);
};

const resetProfiles = (newProfiles) => {
  profiles.length = 0;
  profiles.push(...newProfiles);
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  resetProfiles, // Export reset function for testing
  profiles,
};
