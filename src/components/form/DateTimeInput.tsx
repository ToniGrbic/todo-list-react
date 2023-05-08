import React from "react";
import { useGlobalContext } from "../../state/context";
import { TodoAppContext } from "../../types/todos";

const DateTimeInput = () => {
  const { dateTime, handleDateTime } = useGlobalContext() as TodoAppContext;

  return (
    <div className="datetimeDiv">
      <label htmlFor="date-time">Date & Time: </label>
      <input
        type="datetime-local"
        name="date-time"
        value={dateTime.date + "T" + dateTime.time}
        onChange={(e) => handleDateTime(e.target.value)}
      />
    </div>
  );
};

export default DateTimeInput;
