// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Expense Management System
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ExpenseForm />
        </div>
        <ExpenseList />
      </div>
    </Provider>
  );
}

export default App;
