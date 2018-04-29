export const checkResponseStatus = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response;
};
