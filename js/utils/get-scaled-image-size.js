export const getScaledSize = (dimention, size) => {
  const ratio = Math.min(dimention.width / size.width, dimention.height / size.height);

  return { width: size.width*ratio, height: size.height*ratio };
};
