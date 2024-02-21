// src/ExpenseForm.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addExpense, editExpense, deleteAllExpenses } from "./actions";
import swal from "sweetalert2";
import "./ExpenseForm.css";

const ExpenseForm = ({
  addExpense,
  editExpense,
  deleteAllExpenses,
  editingExpense,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
    }
  }, [editingExpense]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return now.toLocaleDateString("en-US", options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount.trim()) {
      // Show SweetAlert when both fields are empty
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter both description and amount!",
      });
      return;
    }

    const newExpense = {
      id: editingExpense ? editingExpense.id : new Date().getTime(),
      description,
      amount: parseFloat(amount),
      timestamp: getCurrentDateTime(),
    };

    if (editingExpense) {
      editExpense(newExpense);
    } else {
      addExpense(newExpense);
    }

    setDescription("");
    setAmount("");
  };

  return (
    <div className="expense-form">
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button className="edit" type="submit">
          {editingExpense ? "Save" : "Add Expense"}
        </button>
      </form>
      <button className="delete-all" onClick={() => deleteAllExpenses()}>
        Delete All
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    editingExpense: state.expenses.find((expense) => expense.editing),
  };
};

export default connect(mapStateToProps, {
  addExpense,
  editExpense,
  deleteAllExpenses,
})(ExpenseForm);
