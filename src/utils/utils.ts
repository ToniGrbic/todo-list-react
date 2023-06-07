import { ITodo, DateTime } from "../types/todos";
import data from "../state/todos.json";

export const getLocalStorage = (): ITodo[] => {
  let todos = localStorage.getItem("todos");
  if (todos) {
    return (todos = JSON.parse(localStorage.getItem("todos") as string));
  } else {
    return data.todos;
  }
};

const valueOfDate = (date: string, time: string) => {
  return new Date(`${date}T${time}Z`).valueOf();
};

export const sortByDate = (a: DateTime, b: DateTime): number => {
  return valueOfDate(a.date, a.time) - valueOfDate(b.date, b.time);
};

export const sortByCreated = (a: number, b: number): number => {
  return a - b;
};

export const sortArr = ["Newest", "Oldest", "Date Ascending", "Date Decending"];

export const showArr = ["All", "Completed", "Uncompleted"];
