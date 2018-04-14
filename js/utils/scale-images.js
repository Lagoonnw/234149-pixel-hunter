export default (dimentions, size) => {
  const ratio = Math.min(...[dimentions.width / size.width, dimentions.height / size.height]);

  return {width: size.width * ratio, height: size.height * ratio};
};
