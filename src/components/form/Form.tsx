import React, { ReactElement } from "react";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext } from "../../types/todos";
import FormSelect from "./FormSelect";
import TextInput from "./TextInput";
import DateTimeInput from "./DateTimeInput";
const showArr = ["All", "Completed", "Uncompleted"];
const sortArr = ["Newest", "Oldest", "Date Ascending", "Date Decending"];

const Form = (): ReactElement => {
  const { handleSubmit, handleShowSelect, handleSortSelect } = 
        useGlobalContext() as TodoAppContext;

  return (
    <form id="Form" onSubmit={handleSubmit}>
      <DateTimeInput/>
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
