export const mapMovementListFromApitoVm = (movementList, id) => {
  return movementList
    .filter((movement) => movement.accountId === id)
    .map((movement) => mapMovementFromApiToVm(movement));
};

const mapMovementFromApiToVm = (movement) => {
  return {
    id: movement.id,
    description: movement.description,
    amount: `${movement.amount} €`,
    balance: `${movement.balance} €`,
    transaction: new Date(movement.transaction).toLocaleDateString(),
    realTransaction: new Date(movement.realTransaction).toLocaleDateString(),
  };
};
