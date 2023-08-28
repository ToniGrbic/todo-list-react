import React, { ReactElement, useMemo } from "react";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext } from "../../types/todos";
import { FormSelect, TextInput, DateTimeInput } from "../index";
//import { showArr, sortArr } from "../../utils/utils";

const sortArr = ["Newest", "Oldest", "Date Ascending", "Date Descending"];

const showArr = ["All", "Completed", "Uncompleted"];

const Form = (): ReactElement => {
  const { handleSubmit, handleShowSelect, handleSortSelect } =
    useGlobalContext() as TodoAppContext;

  return (
    <form id="Form" onSubmit={handleSubmit}>
      <DateTimeInput />
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
