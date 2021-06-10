import { getMovementList } from './movements.api';
import { addMovementRows } from './movements.helpers';
import { getAccount } from '../account/account.api';
import { history } from '../../core/router';
import { mapAccountFromApiToViewModel } from '../account/account.mappers';
import { mapMovementListFromApitoVm } from './movements.mappers';
import { onSetValues } from '../../common/helpers';

const params = history.getParams();
const hasArgument = Boolean(params.id);

if (hasArgument) {
  getAccount(params.id).then((apiAccount) => {
    account = mapAccountFromApiToViewModel(apiAccount);
    onSetValues(account);
  });

  getMovementList().then((movementList) => {
    const viewModelMovementList = mapMovementListFromApitoVm(
      movementList,
      params.id
    );
    addMovementRows(viewModelMovementList);
  });
}
