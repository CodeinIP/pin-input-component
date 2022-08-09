import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { useRef } from "react";
import PinInput from "./PinInput";
const Pin = ({ length, setOtp, correctOtp }) => {
  const [inputData] = useState(new Array(length).fill(""));
  const [arr] = useState(new Array(length).fill(1));

  // also can use useRef here to store the array
  // store input element in useRef by passing
  //ref = {inputRef} to DOM ELEMENT
  const inputRef = useRef([]);
  const changeHandler = (e, index) => {
    // checking if current element we are focusing on is present or not
    // index should be less than total length-1 so that during last focus
    // e.g if index = 4 and length = 5 to focus on next we have no input with index =5
    // because if length = 5 input element index = [0,1,2,3,4]
    // if we are at index 3 then we can focus on 4 i.e index < length-1(5-1=4)
    // we can focus on last input box
    if (
      e.target.value != " " &&
      e.target.value.length > 0 &&
      index < length-1
    ) {
      inputData[index] = e.target.value;
      setOtp(inputData.join(""));
      inputRef.current[index + 1].focus();
    }else if(index==length-1){
      inputData[index] = e.target.value;
      setOtp(inputData.join(""));
    }
  };
  // how to go back on pressing backspace
  // hanle Back space Funtion
  const handleBackSpace = (e, index) => {
    if (index > 0) {
      inputRef.current[index - 1].focus();
      setOtp(inputData.join(""));
      inputData[index] = e.target.value;
    }
  };
  const handlePasteContent = (e) => {
    const data = e.clipboardData
      .getData("text")
      .split("")
      .filter((_, index) => index < length);
    // console.log(data);
    data.forEach((item, index) => {
      inputRef.current[index].value = item; // add value to dom element
      // adding to inputData array;
      inputData[index] = item;
      // setting focus to last element during traversing
      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
    });
  };
  // useEffect(() => {
  //   console.log(inputData);
  // });
  return (
    <div onPaste={handlePasteContent} >
      {arr.map((_, index) => (
        <PinInput
        correctOtp={correctOtp}
          ref={(ele) => (inputRef.current[index] = ele)}
          key={index}
          onBackSpaceHandler={(e) => handleBackSpace(e, index)}
          singleInputHandler={(e) => changeHandler(e, index)}
        />
      ))}
    </div>
  );
};

export default Pin;

// proptypes ensure that we are getting only the valid values as prop
// if we want setOtp a function it should be a function
// and length should always be a number

Pin.propTypes = {
  length: PropTypes.number.isRequired,
  setOtp: PropTypes.func,
};
