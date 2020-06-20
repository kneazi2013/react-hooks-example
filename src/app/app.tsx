import React, { useState, useEffect, useRef } from "react";
import Routing from "../pages/routing";
import { AppContext } from "./utils";

function useAppConstruct() {
  const [dateInt, setDateInt] = useState<number>(Date.now());
  const doitUpdate = useRef<any>();
  useEffect(() => {
    if (doitUpdate.current) clearTimeout(doitUpdate.current);
    doitUpdate.current = setTimeout(() => setDateInt(Date.now()), 5000);
  });
  return { dateInt };
}

function App() {
  const { dateInt } = useAppConstruct();
  return (
    <div className="page">
      <div className="header">AppWrapper-{dateInt}</div>
      <AppContext.Provider value={dateInt}>
        <Routing />
      </AppContext.Provider>
      <div className="footer">&copy; Test</div>
    </div>
  );
}

export default App;
