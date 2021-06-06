import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { setAccountOptions } from './transfer.helpers';
import { history } from '../../core/router';
import { formValidation, validarFecha } from './transfer.validation';
import { getAccountList } from '../account-list/account-list.api';
import { insertTransfer } from './transfer.api';
import { getAccount } from '../account/account.api';

let transfer = {
  id: '',
  from: '',
  iban: '',
  name: '',
  amount: '',
  concept: '',
  notes: '',
  day: '',
  month: '',
  year: '',
  ejecutionDate: new Date(),
  email: '',
};

const params = history.getParams();
const hasArgument = Boolean(params.id);

//select
getAccountList().then((accountlList) => {
  setAccountOptions(accountlList, params.id);
  if (hasArgument) {
    getAccount(params.id).then((account) => {
      transfer.from = account.iban;
    });
  } else {
    getAccount('1').then((account) => {
      transfer.from = account.iban;
    });
  }
});

onUpdateField('select-account', (event) => {
  const value = event.target.value;
  getAccount(value).then((account) => {
    transfer = {
      ...transfer,
      from: account.iban,
    };
  });
});

//iban destino de la transferencia
onUpdateField('iban', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    iban: value,
  };
  formValidation.validateField('iban', transfer.iban).then((result) => {
    onSetError('iban', result);
  });
});

//beneficiario de la transferencia
onUpdateField('name', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    name: value,
  };
  formValidation.validateField('name', transfer.name).then((result) => {
    onSetError('name', result);
  });
});

//cantidad a traspasar
onUpdateField('amount', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    amount: value,
  };
  formValidation.validateField('amount', transfer.amount).then((result) => {
    onSetError('amount', result);
  });
});

//concepto de la transferencia
onUpdateField('concept', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    concept: value,
  };
  formValidation.validateField('concept', transfer.concept).then((result) => {
    onSetError('concept', result);
  });
});

//observaciones a la transferencia
onUpdateField('notes', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    notes: value,
  };
});

//fecha ejecucion transferencia
onUpdateField('day', (event) => {
  const value = event.target.value;

  const auxDate = new Date(
    parseInt(transfer.year),
    parseInt(transfer.month),
    parseInt(value)
  );
  transfer = {
    ...transfer,
    day: value,
    ejecutionDate: auxDate,
  };
  formValidation.validateField('day', transfer.day).then((result) => {
    onSetError('day', result);
    document.getElementById(`date-error`).textContent = result.message;
  });
});

onUpdateField('month', (event) => {
  const value = event.target.value;

  const auxDate = new Date(
    parseInt(transfer.year),
    parseInt(value),
    parseInt(transfer.day)
  );
  transfer = {
    ...transfer,
    month: value,
    ejecutionDate: auxDate,
  };
  formValidation.validateField('month', transfer.month).then((result) => {
    onSetError('month', result);
    document.getElementById(`date-error`).textContent = result.message;
  });
});

onUpdateField('year', (event) => {
  const value = event.target.value;

  const auxDate = new Date(
    parseInt(value),
    parseInt(transfer.month),
    parseInt(transfer.day)
  );
  transfer = {
    ...transfer,
    year: value,
    ejecutionDate: auxDate,
  };
  formValidation.validateField('year', transfer.year).then((result) => {
    onSetError('year', result);
    document.getElementById(`date-error`).textContent = result.message;
  });
});

//email del beneficiario
onUpdateField('email', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    email: value,
  };
  formValidation.validateField('email', transfer.email).then((result) => {
    onSetError('email', result);
  });
});

onSubmitForm('transfer-button', () => {
  formValidation.validateForm(transfer).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      insertTransfer(transfer);
      history.back();
    }
  });
});
