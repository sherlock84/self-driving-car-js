import React from 'react';
import classNames from 'classnames';
import ManualCar from '../domain/ManualCar';
import styles from './PlayCanvas.module.scss';
import Road from '../domain/Road';

export interface PlayCanvasProps extends Omit<React.HTMLProps<HTMLCanvasElement>, 'height'> {}

const PlayCanvas: React.FC<PlayCanvasProps> = ({ className, width = 200, ...props }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    let isUnmounted = false;

    const road = new Road(canvasRef.current.width / 2, canvasRef.current.width);

    const car = new ManualCar(road.getLaneCenter(1), 100, 30, 50);
    car.mount();

    animate();

    return () => {
      isUnmounted = true;
      car.unmount();
    };

    function animate() {
      if (!canvasRef.current) return;

      canvasRef.current.height =
        canvasRef.current.parentElement?.clientHeight || canvasRef.current.width;

      const context = canvasRef.current.getContext('2d');
      if (!context) return;

      context.save();
      context.translate(0, -car.y + canvasRef.current.height * 0.7);

      road.draw(context);
      car.update();
      car.draw(context);

      context.restore();

      if (isUnmounted) return;

      requestAnimationFrame(animate);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={classNames(styles.playCanvas, className)}
      width={width}
      {...props}></canvas>
  );
};

export default PlayCanvas;
