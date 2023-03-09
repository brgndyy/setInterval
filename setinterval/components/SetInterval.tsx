"use client";

import { useEffect, useRef, useState } from "react";

export default function SetInterval() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [number, setNumber] = useState(60);
  let count = 1;
  let intervalRef = useRef<NodeJS.Timeout | null>(null);

  const inputBlurHandler = () => {
    if (inputRef.current) {
      let num = Number(inputRef.current.value);
      num = num === 0 ? 1 : num;

      setNumber(num);
      console.log("현재 숫자 : ", number);
      inputRef.current.value = num.toString();

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        console.log(count);
        count++;
        if (count === 5) {
          count = 1;
        }
      }, (60 / num) * 1000);
    }
  };

  const numberOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = Number(e.target.value);

    // 최소 숫자 1과 최대숫자 200으로 지정
    if (inputRef.current && num < 1) {
      num = 1;
      inputRef.current.value = num.toString();
    } else if (inputRef.current && num > 200) {
      num = 200;
      inputRef.current.value = num.toString();
    }
    setNumber(num);
  };

  useEffect(() => {
    inputBlurHandler();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
