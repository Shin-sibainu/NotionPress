import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const CelebrationComponent = ({ isSuccess }: { isSuccess: boolean }) => {
  const { width, height } = useWindowSize();

  if (!isSuccess) return null;

  return (
    <div>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={1000}
        gravity={0.15} // 重力を大きくして落下速度を上げる（デフォルトは0.1）
        initialVelocityY={20} // 初期の上昇速度を上げる（デフォルトは0）
        tweenDuration={1000} // アニメーション時間を短くする（ミリ秒単位、デフォルトは5000）
      />
    </div>
  );
};

export default CelebrationComponent;
