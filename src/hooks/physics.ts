import { useEffect, useRef } from "react";
import { useTick } from "@pixi/react";
import { Engine } from "matter-js";
import container from "@/container";

export const usePhysics = () => {
  const engine = useRef<Engine | null>(null);

  useEffect(() => {
    engine.current = container.get<Engine>(Engine);
  }, []);

  useTick((_delta, { deltaMS }) => {
    if (engine.current) {
      Engine.update(engine.current, deltaMS);
    }
  });
};
