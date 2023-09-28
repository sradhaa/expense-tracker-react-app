import "./ExpenseItem.css";

import ExpenseDate from "./ExpenseDate";

import Card from "../UI/Card";

import React, { useState } from "react";

const ExpenseItem = (props) => {
  //console.log("Expene item evaluated by react");
  //let title = props.title;
  const [title, setTitle] = useState(props.title);
  const clickHandler = () => {
    //console.log("Clicked!!!");
    // title = "Updated";
    setTitle("updated !!!");
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price">${props.price}</div>
        </div>
        <button style={{ display: "none" }} onClick={clickHandler}>
          Change Title
        </button>
      </Card>
    </li>
  );
};

// function ExpenseItem({ title, price, date }) {
//   return (
//     <div className="expense-item">
//       <div>{date.toISOString()}</div>
//       <div className="expense-item__description">
//         <h2>{title}</h2>
//         <div className="expense-item__price">${price}</div>
//       </div>
//     </div>
//   );
// }

export default ExpenseItem;
