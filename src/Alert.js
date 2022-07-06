import React, { useEffect } from 'react'
import { useGlobalContext } from './context';
const Alert = () => {
  const { alert, todos, setAlert} = useGlobalContext()
  
  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setAlert( {show:false, type:'', msg:''});
    }, 1700);
    return () => clearTimeout(timeout);
  }, [todos]);
  return <div className={`alertDiv alert-${alert.type}`}>{alert.msg}</div>;
}

export default Alert
