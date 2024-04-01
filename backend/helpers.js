
const isValid = (password) => {
  // Regular expression for password validation
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  // Test the password against the regular expression
  return regex.test(password);

}

module.exports = isValid