import React, { ReactElement } from "react";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext } from "../../types/todos";
import FormSelect from "./FormSelect";
import TextInput from "./TextInput";
const showArr = ["All", "Completed", "Uncompleted"];
const sortArr = ["Newest", "Oldest", "Date Ascending", "Date Decending"];

const Form = (): ReactElement => {
  const {
    dateTime,
    handleSubmit,
    handleDateTime,
    handleShowSelect,
    handleSortSelect,
  } = useGlobalContext() as TodoAppContext;

  return (
    <form id="Form" onSubmit={handleSubmit}>
      <div className="datetimeDiv">
        <label htmlFor="date-time">Date & Time: </label>
        <input
          type="datetime-local"
          name="date-time"
          value={dateTime.date + "T" + dateTime.time}
          onChange={(e) => handleDateTime(e.target.value)}
        />
      </div>
      <TextInput />
      <FormSelect
        handleSelect={handleShowSelect}
        options={showArr}
        type="Show"
      />
      <FormSelect
        handleSelect={handleSortSelect}
        options={sortArr}
        type="Sort By"
      />
    </form>
  );
};
export default Form;
