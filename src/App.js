import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [password, setPassword] = useState('');
  const [isStrong, setIsStrong] = useState(false);
  const minLength = 6;
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

    if (pswd.length > minLength - 1) {
      const checks = Object.values(requirements).map((requirement) => meetsRequirement(pswd, requirement))
      setIsStrong(checks.every(check => check))
    } else {
      setIsStrong(false)
    }
  }

  const missingStrengths = () => {
    const missing = []
    for (const [message, requirement] of Object.entries(requirements)) {
      if (!meetsRequirement(password, requirement)) missing.push(message)
    }
    if (password.length < minLength) missing.push(`Password must be at least ${minLength} characters long`)
    return missing
  }

  return (
    <div>
      <input
        id="password"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <p id="message">Your password is {isStrong ? 'strong' : 'weak'}!</p>
      <ul id="requirements">
        {missingStrengths().map((missingStrength) => {
          return <li key={missingStrength}>{missingStrength}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
