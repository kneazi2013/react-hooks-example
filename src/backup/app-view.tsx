import React, {
  memo,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
// import { IAppProps, IAppState } from "./app-models";

// -----------------------------------------------------
/** Utils */

const min = 0;
const max = 100;
const getRandomValue = (props?: any) => min + Math.random() * (max - min);

/** Вспомогательный метод */
const updateIndexState = (
  evt: EventClick,
  setState: React.Dispatch<React.SetStateAction<IAppState>>,
  indexState: number
) => {
  evt.preventDefault();
  setState((prev) => ({ ...prev, index: getRandomValue() }));
};

// -----------------------------------------------------
/** Типизация */

interface IAppProps {
  index: Symbol;
}
interface IAppState {
  index: number;
}
type EventClick = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type HandleClick = (evt: EventClick) => void;

// -----------------------------------------------------
// Реализация жизненного цикла для функционального компонента

/** Конструктор компонента */
function useConstructor(
  indexProps: Symbol
): {
  memoValue: number;
  memoTxt: string;
  handleClick: HandleClick;
} {
  console.log("constructor");
  const [{ index: indexState }, setState] = useState<IAppState>({
    index: getRandomValue(),
  });

  const memoValue = useMemo<number>(() => getRandomValue({ indexProps }), [
    indexProps,
  ]);

  const memoTxt = useMemo<string>(() => {
    return `TXT-${indexState}`;
  }, [indexState]);

  const handleClick = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      updateIndexState(evt, setState, indexState),
    [indexState, setState]
  );

  return { memoValue, memoTxt, handleClick };
}

/** Метод отработает только первый раз после монтирования DOM */
function componentDidMount(
  isMount: React.MutableRefObject<boolean>,
  memoTxt: string
) {
  console.log("componentDidMount", isMount.current, memoTxt);
  isMount.current = true;
}

function getSnapshotBeforeUpdate(
  isMount: React.MutableRefObject<boolean>,
  memoTxt: string
) {
  if (!isMount.current) return;
  console.log("getSnapshotBeforeUpdate", isMount.current, memoTxt);
}

function componentDidUpdate(isMount: React.MutableRefObject<boolean>) {
  if (!isMount.current) return;
  const txtMemoValue = document.getElementById("memo_value")?.innerText;
  console.log("componentDidUpdate", txtMemoValue);
}

const shouldComponentUpdate = (prev: IAppView, next: IAppView) =>
  prev.memoValue === next.memoValue &&
  prev.memoTxt === next.memoTxt &&
  prev.handleClick === next.handleClick;

// -----------------------------------------------------
// Controller

function AppController({ index: indexProps }: IAppProps) {
  const isMount = useRef(false);
  const { memoValue, memoTxt, handleClick } = useConstructor(indexProps);

  // getSnapshotBeforeUpdate
  useLayoutEffect(() => getSnapshotBeforeUpdate(isMount, memoTxt), [memoTxt]);

  // componentDidMount
  // componentDidUpdate
  useEffect(
    () =>
      isMount.current
        ? componentDidUpdate(isMount)
        : componentDidMount(isMount, memoTxt),
    [memoTxt]
  );

  // shouldComponentUpdate
  // интегрируется в отрисовку
  return (
    <AppView
      memoValue={memoValue}
      memoTxt={memoTxt}
      handleClick={handleClick}
    />
  );
}

// -----------------------------------------------------
// View

interface IAppView {
  memoValue: number;
  memoTxt: string;
  handleClick: HandleClick;
}

const AppView = memo(({ memoValue, memoTxt, handleClick }: IAppView) => {
  console.log("render");
  return (
    <div>
      <div>App</div>
      <div>
        memoValue: <span id="memo_value">{memoValue}</span>
      </div>
      <div>
        <button onClick={handleClick}>Click</button>
        <hr />
        {memoTxt}
      </div>
    </div>
  );
}, shouldComponentUpdate);

// -----------------------------------------------------
// Main

export default function AppMain() {
  const [state, setState] = useState<Symbol>(Symbol());

  // Имитируем обновление входных параметров
  const doit = useRef<any>();
  if (typeof doit.current === "number") clearTimeout(doit.current);
  doit.current = setTimeout(() => setState(Symbol()), 3000);
  
  return <AppController index={state} />;
}
