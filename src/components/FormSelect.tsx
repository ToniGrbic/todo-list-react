import React from 'react'
import { FormSelectProps } from '../types/todos';

const FormSelect = ({handleSelect, options, type}: FormSelectProps) => {
  return (
    <div className="selectDiv">
      <label htmlFor={type}>{type}: </label>
      
      <select name={type} onChange={(e) => handleSelect(e.target.value)}>
        {options?.map((option: string, index)=>{
            return (
                <option key={index} value={option}>
                    {option}
                </option>
            )
        })}
      </select>
    </div>
  );
}

export default FormSelect