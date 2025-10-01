"use client";

import { useState } from "react";
import { PlayButton } from "../atoms/PlayButton";
import { PauseButton } from "../atoms/PauseButton";

export function SimplePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // TODO: Intégrer avec le système audio réel
    console.log("Lecture démarrée");
  };

  const handlePause = () => {
    setIsPlaying(false);
    // TODO: Intégrer avec le système audio réel
    console.log("Lecture mise en pause");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Spotinext Player
      </h2>

      <div className="flex items-center space-x-4">
        {isPlaying ? (
          <PauseButton onClick={handlePause} />
        ) : (
          <PlayButton onClick={handlePlay} />
        )}
      </div>

      <div className="text-sm text-gray-500">
        {isPlaying ? "En cours de lecture..." : "Prêt à jouer"}
      </div>
    </div>
  );
}
