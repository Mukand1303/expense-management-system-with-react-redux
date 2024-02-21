// src/ExpenseList.js
import React, { useState } from "react";
import { connect } from "react-redux";
import { removeExpense, editExpense } from "./actions";
import "./ExpenseList.css"; // Import the CSS file

const ExpenseList = ({ expenses, removeExpense, editExpense }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  const handleEdit = (expense) => {
    setEditMode(expense.id);
    setEditedDescription(expense.description);
    setEditedAmount(expense.amount);
  };

  const handleSaveEdit = (originalExpense) => {
    const editedExpense = {
      id: originalExpense.id,
      description: editedDescription,
      amount: parseFloat(editedAmount),
      timestamp: originalExpense.timestamp,
    };

    editExpense(editedExpense);
    setEditMode(null);
    setEditedDescription("");
    setEditedAmount("");
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedDescription("");
    setEditedAmount("");
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="expense-list">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              {editMode === expense.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                    />
                  </td>
                  <td>{expense.timestamp}</td>
                  <td>
                    <button onClick={() => handleSaveEdit(expense)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{expense.description}</td>
                  <td>${expense.amount}</td>
                  <td>{expense.timestamp}</td>
                  <td>
                    <button onClick={() => handleEdit(expense)}>Edit</button>
                    <button onClick={() => removeExpense(expense.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="total-label">
              Total Expense:
            </td>
            <td className="total-amount">${totalExpense.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeExpense: (id) => dispatch(removeExpense(id)),
    editExpense: (expense) =>
      dispatch({ type: "EDIT_EXPENSE", payload: expense }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
