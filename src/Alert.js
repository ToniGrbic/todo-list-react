import React, { useEffect } from 'react'

const Alert = ({type, msg, list, removeAlert}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <div className={`alertDiv alert-${type}`}>{msg}</div>;
}

export default Alert
