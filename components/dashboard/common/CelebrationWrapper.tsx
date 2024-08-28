"use client";

import React, { useEffect, useState } from "react";
import CelebrationComponent from "./CelebrationComponent";

const CelebrationWrapper = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const success = localStorage.getItem("blogCreationSuccess");
    if (success === "true") {
      setShowCelebration(true);
      localStorage.removeItem("blogCreationSuccess"); // フラグをリセット
    }
  }, []);

  return <CelebrationComponent isSuccess={showCelebration} />;
};

export default CelebrationWrapper;
