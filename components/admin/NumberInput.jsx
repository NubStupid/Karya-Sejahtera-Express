import React, { useState, useEffect } from 'react';

const NumberInput = (props) => {
  const [inputValue, setInputValue] = useState(props.qty || 0);

  useEffect(() => {
    setInputValue(props.qty || 0);
  }, [props.qty]);

  const handleChange = (event) => {
    let value = event.target.value
    if(event.target.value <= 0){
      value=0
    }
    setInputValue(value);
    props.handleCart(props.id,value,props.payload)
  };

  return (
    <input
      type="number"
      name=""
      id=""
      className='text-center'
      style={{maxWidth:"100%"}}
      min={0}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
