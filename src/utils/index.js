// Function to generate a random ID
export const generateRandomId = () => {
  return Math.floor(Math.random() * 10000) + Date.now();
};

// convert date to human friendly date
export const getRemainingDays = targetDate => {
  const today = new Date();
  const target = new Date(targetDate);

  // Calculate the difference in time (in milliseconds)
  const diffTime = target - today;

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  } else if (diffDays === 0) {
    return 'Due today';
  } else {
    return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`;
  }
};
