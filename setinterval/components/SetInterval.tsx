"use client";

import { useEffect, useRef, useState } from "react";

export default function SetInterval() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [number, setNumber] = useState(60);

  const inputBlurHandler = () => {
    if (inputRef.current) {
      let num = Number(inputRef.current.value);
      num = num === 0 ? 1 : num;
      console.log("현재 숫자 : ", num);
      setNumber(num);
      inputRef.current.value = num.toString();
    }
  };

  const numberOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = Number(e.target.value);

    if (inputRef.current && num < 1) {
      num = 1;
      inputRef.current.value = num.toString();
    }

    setNumber(num);
  };

  return (
    <>
      <input
        type={"number"}
        value={number}
        min={1}
        max={200}
        step={1}
        onBlur={inputBlurHandler}
        onChange={numberOnChangeHandler}
        ref={inputRef}
      />
    </>
  );
}
