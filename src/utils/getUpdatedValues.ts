export const getUpdatedValues = (oldObj: any, newObj: any) => {
  const updatedValues: any = {};

  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (oldObj[key] !== newObj[key]) {
        updatedValues[key] = newObj[key];
      }
    }
  }

  return updatedValues;
};
