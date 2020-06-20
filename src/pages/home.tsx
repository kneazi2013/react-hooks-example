import React, { useContext, useState, useCallback } from "react";
import { AppContext } from "../app/utils";

function useConstructor() {
  const propsValue = useContext(AppContext);
  const [stateValue, setValue] = useState<number>(propsValue);
  const onClick = useCallback(() => setValue(Date.now()), [setValue]);
  return { propsValue, stateValue, onClick };
}

export default function Home() {
  const { propsValue, stateValue, onClick } = useConstructor();
  return (
    <div>
      <div>Home</div>
      <div>propsValue: {propsValue}</div>
      <div>stateValue: {stateValue}</div>
      <div>
        <button onClick={onClick}>refresh</button>
      </div>
    </div>
  );
}
