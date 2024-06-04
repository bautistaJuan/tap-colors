/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { useEffect, useMemo, useState } from "react";

type Color = {
  name: string;
  color: string;
  correct: boolean
}
const COLORS: Color[] = [
  {
    name: "rojo",
    color: "#EF476F",
    correct: false
  },
  {
    name: "verde",
    color: "#06D6A0",
    correct: false
  },
  {
    name: "amarillo",
    color: "#FFD166",
    correct: false
  },
  {
    name: "azul",
    color: "#118AB2",
    correct: false
  },
];

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">("initial");
  const [time, setTime] = useState<number>(0);
  const [score, setSCore] = useState<number>(0);
  const [gameColors, setGameColors] = useState<Color[]>([]);
  const correctColor = useMemo<Color>(
    () => gameColors.find((color) => color.correct)!, [gameColors]
  );

  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setSCore(0);

    const [color, wrongColor] = COLORS.slice().sort(() => Math.random() - 0.5);

    setGameColors([
      { ...color, correct: true },
      wrongColor
    ].sort(() => Math.random() - 0.5));
  };

  function handleReset() {
    setStatus("initial");
    setTime(0);
    setSCore(0);
  }
  function handleColorClick(clickedColor: Color) {

    if (clickedColor.correct) {
      setSCore((score) => score + 1);

      if (score === 15) {
        setStatus("finished");
      } else {
        const [color, wrongColor] = COLORS.slice().sort(() => Math.random() - 0.5);

        setGameColors([
          { ...color, correct: true },
          wrongColor
        ].sort(() => Math.random() - 0.5));
      }
    } else {
      setSCore((score) => score - 2);
    }

  };


  useEffect(() => {
    let interval: number;

    if (status === "playing") {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <main style={{ backgroundColor: status === "playing" ? gameColors[1].color : "inherit" }}>
      <header>
        <h1>{score > 0 ? score : 0} puntos</h1>
        <h1>{time} segundos</h1>
      </header>
      {status === "playing" && (
        <section>
          <span style={{ textTransform: "capitalize", color: gameColors[0].color }}>{correctColor.name}</span>
        </section>
      )}
      <footer>
        {status === "initial" && (
          <button
            onClick={handlePlay}
          >
            Jugar
          </button>
        )}
        {status === "finished" && (
          <button
            onClick={handleReset}
          >
            Reiniciar
          </button>
        )}
        {status === "playing" && (
          <>
            <button className="buttonColors" style={{ border: `4px solid ${gameColors[1].color}`, backgroundColor: gameColors[0].color }} onClick={() => handleColorClick(gameColors[0])} />
            <button className="buttonColors" style={{ border: `4px solid ${gameColors[0].color}`, backgroundColor: gameColors[1].color }} onClick={() => handleColorClick(gameColors[1])} />
          </>)}
      </footer>
    </main>
  );
}

export default App;
