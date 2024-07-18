import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [highscore, setHighscore] = useState(1);

  const btns = ["yellow", "grey", "purple", "red"];

  useEffect(() => {
    const handleKeyPress = () => {
      if (!started) {
        console.log("Game Started");
        setStarted(true);
        levelUp();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [started]);

  const btnFlash = (btn) => {
    btn.classList.add("flashBtn");
    setTimeout(() => {
      btn.classList.remove("flashBtn");
    }, 500);
  };

  const userFlash = (btn) => {
    btn.classList.add("userFlash");
    setTimeout(() => {
      btn.classList.remove("userFlash");
    }, 500);
  };

  const levelUp = () => {
    setUserSeq([]);
    setLevel(prevLevel => {
      const newLevel = prevLevel + 1;
      if (newLevel >= highscore) {
        setHighscore(newLevel);
      }
      return newLevel;
    });

    const randIdx = Math.floor(Math.random() * 4);
    const randColor = btns[randIdx];
    setGameSeq(prevGameSeq => {
      const newGameSeq = [...prevGameSeq, randColor];
      setTimeout(() => {
        const randBtn = document.querySelector(`.${randColor}`);
        btnFlash(randBtn);
      }, 500);
      return newGameSeq;
    });
  };

  const checkAns = (idx) => {
    if (userSeq[idx] === gameSeq[idx]) {
      if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
      }
    } else {
      document.querySelector("h2").innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any Key to Start.`;
      document.querySelector("h3").innerHTML = `Highest Score =  ${highscore}`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "white";
      }, 1000);
      reset();
    }
  };

  const handleBtnPress = (color) => {
    const btn = document.getElementById(color);
    userFlash(btn);
    setUserSeq(prevUserSeq => {
      const newUserSeq = [...prevUserSeq, color];
      checkAns(newUserSeq.length - 1);
      return newUserSeq;
    });
  };

  const reset = () => {
    setStarted(false);
    setGameSeq([]);
    setUserSeq([]);
    setLevel(0);
  };

  return (
    <div>
      <h1>Simon Says Game</h1>
      <h2>Press any key to start the game</h2>
      <h3></h3>
      <div className="btn-container">
        <div className="line-one">
          <div className="btn red" id="red" onClick={() => handleBtnPress("red")}></div>
          <div className="btn yellow" id="yellow" onClick={() => handleBtnPress("yellow")}></div>
        </div>
        <div className="line-two">
          <div className="btn grey" id="grey" onClick={() => handleBtnPress("grey")}></div>
          <div className="btn purple" id="purple" onClick={() => handleBtnPress("purple")}></div>
        </div>
      </div>
    </div>
  );
};

export default App;
