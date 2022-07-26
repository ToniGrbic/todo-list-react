import React, { useEffect } from 'react'
import { useGlobalContext } from './context';
const Alert = () => {
  const { alert, todos, showAlert} = useGlobalContext()
  
  useEffect(() => {
    
    const timeout = setTimeout(() => {
      showAlert(false, '', '');
    }, 1700);
    return () => clearTimeout(timeout);
  }, [todos]);
  return <div className={`alertDiv alert-${alert.type}`}>{alert.msg}</div>;
}

export default Alert
