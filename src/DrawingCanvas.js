import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: 800,
      height: 600,
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawingCanvas;
