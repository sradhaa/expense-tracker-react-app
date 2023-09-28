import "./Expenses.css";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import React, { useState } from "react";
import ExpensesChart from "./ExpensesChart";

import ExpensesList from "./ExpensesList";
const Expenses = (props) => {
  let defaultYear = "2020";
  const [filteredYear, setFilteredYear] = useState(defaultYear);
  const [filterInfoText, setfilterInfoText] = useState("2019,2020,2021");
  //console.log(filteredYear);
  // let filterInfoText = "2019,2021,2022";
  // if (filteredYear === "2019") {
  //   filterInfoText = "2020,2021,2022";
  // } else if (filteredYear === "2020") {
  //   filterInfoText = "2019,2021,2022";
  // } else if (filteredYear === "2022") {
  //   filterInfoText = "2019,2021,2020";
  // } else if (filteredYear === "2021") {
  //   filterInfoText = "2019,2020,2022";
  // }
  //console.log(props.item);
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    if (selectedYear === "2019") {
      setfilterInfoText("2020,2021,2022");
    } else if (selectedYear === "2020") {
      setfilterInfoText("2019,2021,2022");
    } else if (selectedYear === "2022") {
      setfilterInfoText("2019,2021,2020");
    } else if (selectedYear === "2021") {
      setfilterInfoText("2019,2020,2022");
    }
  };

  const filteredData = props.item.filter(
    (f) => f.date.getFullYear().toString() === filteredYear
  );

  // console.log(filteredData);
  // console.log(props.item);

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredData} />
        <p style={{ color: "white" }}>
          Data for years {filterInfoText} is hidden
        </p>
        <ExpensesList items={filteredData} />;{/* using filter methode */}
        {/* {filteredData.length === 0 ? (
          <p>No data found</p>
        ) : (
          filteredData.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              price={expense.amount}
              date={expense.date}
              year={expense.date.toLocaleString("en-US", { year: "numeric" })}
            />
          ))
        )} */}
        {/* without using filter methode */}
        {/* {props.item.map(
          (expense) =>
            // Use a ternary expression for conditional rendering
            expense.date.toLocaleString("en-US", { year: "numeric" }) ===
            filteredYear ? (
              <ExpenseItem
                key={expense.id}
                title={expense.title}
                price={expense.amount}
                date={expense.date}
                year={expense.date.toLocaleString("en-US", { year: "numeric" })}
              />
            ) : null // Return null or an alternative component when the condition is not met
        )} */}
        {/* <ExpenseItem
          title={props.item[0].title}
          price={props.item[0].amount}
          date={props.item[0].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.item[1].title}
          price={props.item[1].amount}
          date={props.item[1].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.item[2].title}
          price={props.item[2].amount}
          date={props.item[2].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.item[3].title}
          price={props.item[3].amount}
          date={props.item[3].date}
        ></ExpenseItem> */}
      </Card>
    </div>
  );
};

export default Expenses;
