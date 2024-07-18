const users = [
    { email: 'test@example.com', password: 'password123' }
  ];
  
  const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };

  const register = (req, res) => {
    const { email, password, fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body;
  
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
  
    const newUser = { email, password, fullName, address1, address2, city, state, zipCode, skills, preferences, availability };
    users.push(newUser);
  
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  };
  
  module.exports = { login, register };
  