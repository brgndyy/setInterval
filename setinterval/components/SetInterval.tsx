"use client";

import { useEffect, useRef, useState } from "react";

export default function SetInterval() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [number, setNumber] = useState(60);
  let count = 1;
  let intervalRef = useRef<NodeJS.Timeout | null>(null);

  // input 값에 값을 입력하고 블러처리 될때의 이벤트

  const inputBlurHandler = () => {
    if (inputRef.current) {
      let num = Number(inputRef.current.value);

      setNumber(num);
      console.log("현재 숫자 : ", number);
      inputRef.current.value = num.toString();

      // 이전에 작동하던 setInterval 중단시키고 새롭게 리셋
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

  // input 안의 값을 변경할때 발생할 이벤트

  const numberOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //input의 value는 문자열이기때문에 일단 숫자로 변경해줘야함
    let num = Number(e.target.value);

    // 최소 숫자 1과 최대숫자 200으로 지정
    if (inputRef.current && num < 1) {
      num = 1;
      // 숫자로 변경해준 후 다시 문자로 변경해주어서 값을 업데이트
      inputRef.current.value = num.toString();
    } else if (inputRef.current && num > 200) {
      num = 200;
      inputRef.current.value = num.toString();
    }
    setNumber(num);
  };

  // 컴포넌트 마운드 되자마자 메트로놈 시작
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
