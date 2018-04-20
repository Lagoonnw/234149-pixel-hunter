const remainingSeconds = 5;
export default (value, element) => {
  element.textContent = value;
  if (value === remainingSeconds) {
    element.classList.add(`blink`);
  }
};

