export const showMessage = (message) => {
  const INTERVAL = 3000;
  const node = document.createElement(`div`);
  node.style = `width: 180px; 
  margin: 0 auto; 
  text-align: center; 
  background-color: red; 
  position: fixed; 
  top: 0; 
  left: 50%; 
  margin-left: -90px; 
  z-index: 10;`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
  setTimeout(() => {
    node.remove();
  }, INTERVAL);
};
