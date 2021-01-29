import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [password, setPassword] = useState('');
  const [isStrong, setIsStrong] = useState(false);
  const requirements = {
    'At least one lowercase letter is required': /[a-z]/,
    'At least one uppercase letter is required': /[A-Z]/,
    'At least one number is required': /\d/,
    'At least one of symbols is required (!@#$%^&*)': /[!@#$%^&*]/,
  } 

  const meetsRequirement = (secret, regexp) => {
    return secret.search(regexp) > -1
  }

  const handleChange = (event) => {
    const pswd = event.target.value
    setPassword(pswd);

    if (pswd.length > 5) {
      Object.values(requirements).forEach((requirement) => {
        meetsRequirement(pswd, requirement) ? setIsStrong(true) : setIsStrong(false)
      })
    } else {
      setIsStrong(false)
    }
  }

  const missingStrengths = () => {
    const missing = []
    for (const [message, requirement] of Object.entries(requirements)) {
      if (!meetsRequirement(password, requirement)) missing.push(message)
    }
    if (password.length < 6) missing.push('Password must be at least 6 characters long')
    return missing
  }

  return (
    <div className="App">
      <input type="password" value={password} onChange={handleChange} />
      <p>Your password is {isStrong ? 'strong' : 'weak'}!</p>
      <ul>
        {missingStrengths().map((missingStrength) => {
          return <li key={missingStrength}>{missingStrength}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
