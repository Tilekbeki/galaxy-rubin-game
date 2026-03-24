import styles from "./GameScene.module.css";

import Robot from "../Robot";
import PlayButton from "../PlayButton";
import TextPreview from "../TextPreview";
import Scale from "../Scale";
import MeasureBar from "../MeasureBar";
import PushButton from "../PushButton";
import Hammer from "../Hammer";

const GameScene = ({
  gameStatus,
  hammerState,
  robotState,
  buttonText,
  onAction,
}) => {
  const isHidden = robotState === "punched";

  return (
    <div className={styles.container}>
      <MeasureBar isWin={gameStatus === "win"} />
      <PushButton onPunch={onAction} />
      <Hammer state={hammerState} />

      <div className={styles.controllers}>
        <Scale />

        <div
          className={`${styles.interactiveBlock}
            ${isHidden ? styles.interactiveBlockHidden : ""}
            ${gameStatus === "win" ? styles.interactiveBlockWin : ""}
          `}
        >
          <TextPreview />
          <PlayButton text={buttonText} onClick={onAction} />
        </div>

        <Robot />
      </div>
    </div>
  );
};

export default GameScene;