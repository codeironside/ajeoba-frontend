export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const getPropertyFromState = (state, property) =>
  Object.values(state).find((stateObject) => stateObject[property])?.[property];
