"use client";
import React, { useState, useEffect } from "react";

type Props = {
  initialCount: number;
};

const Timer = ({ initialCount }: Props) => {
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);
  const [paused, setPaused] = useState(0);
  const [remained, setRemained] = useState(0);

  const start = () => {
    setIsRunning((state) => true);
    setRemained((state) => Date.now());
  };
  const pause = () => {
    setIsRunning((state) => false);
    setPaused((state) => Date.now());
  };
  const reset = () => {
    setIsRunning((state) => false);
    setCount((state) => initialCount);
  };

  const tick = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const diffMilliSec = () => {
    if (remained > paused) {
      return remained - paused;
    }
  };

  const codeText: string = `
    const diffmillisec = () => {
    if (remained > paused) {
      return remained - paused;
    }
  };
  `;

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isRunning && count > 0) {
      timerId = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [count, isRunning]);
  return (
    <div>
      <span>{count}</span>
      <div className="flex items-center gap-4">
        <button className="bg-slate-500" onClick={start}>
          start
        </button>
        <button className="bg-slate-500" onClick={pause}>
          pause
        </button>
        <button className="bg-slate-500" onClick={reset}>
          reset
        </button>
      </div>
      <div>
        <div>タイムスタンプ</div>
        <div>停止：{paused}</div>
        <div>再開：{remained}</div>
        <div>差分時間：{diffMilliSec()}</div>
        <div className=" flex flex-col my-4 p-2  bg-gray-900">
          <p className="font-bold text-lg">やりてえこと</p>
          <p className="text-red-500 py-2 text-3xl">
            差分時間 = 再開時間 - 停止時間
          </p>
          <small>
            差分時間を求めたかった。停止と再開はToggleなのでマイナスが返ってくる事があるが、それはいらので、
          </small>
          <code>{codeText}</code>
          <small>
            としている。この方法がベストプラクティスかどうかはわかんないが、とりあえず欲しいものは取れたので良しとする。
          </small>
        </div>
      </div>
    </div>
  );
};

export default Timer;
