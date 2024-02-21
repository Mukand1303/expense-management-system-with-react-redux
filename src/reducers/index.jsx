// src/reducers/index.js
const initialState = {
  expenses: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "EDIT_EXPENSE":
      const editedExpenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
      return {
        ...state,
        expenses: editedExpenses,
      };
    case "DELETE_ALL_EXPENSES":
      return {
        ...state,
        expenses: [],
      };
    default:
      return state;
  }
};

export default expenseReducer;
