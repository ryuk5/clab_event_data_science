import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Register from "./Register";

const Counter = () => {
  const [state, setstate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: "",
  });
  const [animation, setAnimation] = useState(false);
  let interval = useRef(null);
  const startTimer = () => {
    let countDate = new Date("Jan 16, 2021 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      let gap = countDate - now;

      let second = 1000;
      let minute = second * 60;
      let hour = minute * 60;
      let day = hour * 24;

      let d = Math.floor(gap / day);
      let h = Math.floor((gap % day) / hour);
      let m = Math.floor((gap % hour) / minute);
      let s = Math.floor((gap % minute) / second);
      if (gap > 0) {
        setstate({
          days: d,
          hours: h,
          minutes: m,
          seconds: s,
          finished: false,
        });
      }
    }, 1000);
  };

  const onAnimate = () => setAnimation((prevAnimation) => !prevAnimation);

  //componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  if (
    state.days === 0 &&
    state.hours === 0 &&
    state.minutes === 0 &&
    state.seconds === 0 &&
    state.finished === false
  )
    setstate({ ...state, finished: true });

  return (
    <>
      <h3>CountDown to Data Science Event</h3>

      {!animation &&
        <h2
          className={
            animation &&!state.finished
              ? "animate__animated animate__fadeOutUp"
              : "animate__animated animate__fadeInDown input"
          }
        >
          2020
        </h2>
} 
      {animation && <Register /> }

      <div className="countdown">
        <div id="day">{state.days}</div>
        <div id="hour">{state.hours}</div>
        <div id="minute">{state.minutes}</div>
        <div id="second">{state.seconds}</div>
      </div>

      <Button finished={state.finished} onAnimate={() => onAnimate()} />
    </>
  );
};

export default Counter;
