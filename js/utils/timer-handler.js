const fiveSeconds = 5;
export default (value, element) => {
  element.textContent = value;
  if (value === fiveSeconds) {
    element.classList.add(`blink`);
  }
};

