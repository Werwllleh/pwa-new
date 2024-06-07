import React from 'react';

const Switch = ({active}) => {


  return (
    <div className="switch">
      <input className="switch__input" type="checkbox" checked={active}/>
      <div className="switch__view"></div>
    </div>
  );
};

export default Switch;