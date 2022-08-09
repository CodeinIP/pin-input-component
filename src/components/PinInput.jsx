import React, { forwardRef } from "react";

const PinInput = forwardRef(({ singleInputHandler,onBackSpaceHandler,correctOtp }, ref) => {

  const handleKeyUp = (e) => {
    if (e.keyCode === 8 && !e.target.value) {
      onBackSpaceHandler(e);
    } else {
      singleInputHandler(e);
    }
  };
  return (
    <input
      ref={ref}
    className={correctOtp ? "correctOtp" : "pinInput"}
      type="text"
      maxLength={1}
      onKeyUp={handleKeyUp}
    />
  );
});

export default PinInput;
