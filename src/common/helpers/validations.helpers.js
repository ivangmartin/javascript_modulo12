const VALIDATOR_TYPE = 'POSITIVO';

let defaultMessage = 'Cantidad debe ser mayor que 0';
export const setErrorMessage = (message) => (defaultMessage = message);
export const posValidator = (fieldValidatorArgs) => {
  const { value } = fieldValidatorArgs;

  const succeeded = value > 0;

  return {
    succeeded,
    message: succeeded ? '' : 'Cantidad debe ser mayor que 0',
    type: VALIDATOR_TYPE,
  };
};

export const minNumberValidator = ({ value, customArgs }) => {
  const succeeded = isNaN(value) || value >= customArgs.min;
  return {
    succeeded,
    message: succeeded ? '' : `Debe ser mayor que ${customArgs.min}`,
    type: 'MIN_NUMBER',
  };
};

export const maxNumberValidator = ({ value, customArgs }) => {
  const succeeded = isNaN(value) || value <= customArgs.max;
  return {
    succeeded,
    message: !succeeded ? '' : `Debe ser menor que ${customArgs.max}`,
    type: 'MAX_NUMBER',
  };
};
