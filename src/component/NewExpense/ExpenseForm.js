import React, { useState } from "react";
import "./ExpenseForm.css";
const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  //const [enteredDate1, setEnteredDate1] = useState("");

  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  const titleChangeHandler = (event) => {
    // setUserInput((prevState) => {
    //   console.log(prevState);
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    //   setUserInput({ ...userInput, enteredAmount: event.target.value });
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    // setUserInput({ ...userInput, enteredDate: event.target.value });
    setEnteredDate(event.target.value);
  };

  //   const dateChangeHandler1 = (event) => {
  //     setEnteredDate1(event.target.value);
  //   };
  //console.log(enteredDate1);
  //console.log(enteredTitle);
  // const inputChangeHandler = (identifier, value) => {
  //   if (identifier == "title") {
  //     console.log(value);
  //     setEnteredTitle(value);
  //   }
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };
    // console.log(expenseData);
    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={enteredTitle}
          />
          {/* <input
            type="text"
            onChange={(event) =>
              inputChangeHandler("title", event.target.value)
            }
          /> */}
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            step="2022-12-31"
            onChange={dateChangeHandler}
            value={enteredDate}
          />
        </div>

        {/* <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            step="2022-12-31"
            onChange={dateChangeHandler1}
          />
        </div> */}
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expene</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
