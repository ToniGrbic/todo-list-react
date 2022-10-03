import { ITodo, DateTime } from '../types/todos'

export const getLocalStorage = ():ITodo[] => {
    let todos = localStorage.getItem('todos');
    if (todos) {
      return (todos = JSON.parse(localStorage.getItem('todos') as string));
    } else {
      return [];
    }
}

const valueOfDate= (date:string, time:string):number =>{
  return new Date(`${date}T${time}Z`).valueOf()
}

export const sortByDate = (a:DateTime, b:DateTime):number =>{
    return (valueOfDate(a.date, a.time) - valueOfDate(b.date, b.time))
  }

export const sortByCreated = (a:number, b:number):number =>{
    return a - b;
  }