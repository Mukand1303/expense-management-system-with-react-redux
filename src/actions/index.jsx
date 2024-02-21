// src/actions/index.js
export const addExpense = (expense) => {
  return {
    type: "ADD_EXPENSE",
    payload: expense,
  };
};

export const removeExpense = (id) => {
  return {
    type: "REMOVE_EXPENSE",
    payload: id,
  };
};

export const editExpense = (expense) => {
  return {
    type: "EDIT_EXPENSE",
    payload: expense,
  };
};

export const deleteAllExpenses = () => ({
  type: "DELETE_ALL_EXPENSES",
});
