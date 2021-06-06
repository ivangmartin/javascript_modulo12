import { Validators, createFormValidation } from '@lemoncode/fonk';
import { iban } from '@lemoncode/fonk-iban-validator';
import {
  posValidator,
  minNumberValidator,
  maxNumberValidator,
  dateValidator,
} from '../../common/helpers/validations.helpers';

Validators.required.setErrorMessage('Campo requerido');

const validationSchema = {
  field: {
    iban: [
      {
        validator: Validators.required,
      },
      {
        validator: iban.validator,
        message: 'El campo debe tener un formato IBAN válido',
      },
    ],
    name: [
      {
        validator: Validators.required,
      },
    ],
    amount: [
      {
        validator: posValidator,
      },
    ],
    concept: [
      {
        validator: Validators.required,
      },
    ],
    day: [
      {
        validator: Validators.required,
      },
      {
        validator: maxNumberValidator,
        customArgs: { max: 31 },
      },
      {
        validator: minNumberValidator,
        customArgs: { min: 1 },
      },
    ],
    month: [
      {
        validator: Validators.required,
      },
      {
        validator: maxNumberValidator,
        customArgs: { max: 12 },
      },
      {
        validator: minNumberValidator,
        customArgs: { min: 1 },
      },
    ],
    year: [
      {
        validator: Validators.required,
      },
      {
        validator: maxNumberValidator,
        customArgs: { max: 2030 },
      },
      {
        validator: minNumberValidator,
        customArgs: { min: 2021 },
      },
    ],
    email: [
      {
        validator: Validators.required,
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
