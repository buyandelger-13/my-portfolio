import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import butterfly from '../../../public/butterfly.svg';

interface Butterfly {
  id: number;
  x: number;
  y: number;
  size: number;
  currentRotation: number;
  targetRotation: number;
  targetX: number;
  targetY: number;
  speed: number;
  wanderAngle: number;
  wingFlapSpeed: number;
  wingState: number;
  imageIndex: number;
}

const ButterflyAnimation: React.FC = () => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const butterflyDataRef = useRef<Butterfly[]>([]);
  const butterflyElementsRef = useRef(new Map<number, HTMLDivElement>());
  const animationFrameRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);

  const butterflyImages = [butterfly];

  const lerp = (start: number, end: number, amount: number) => {
    return (1 - amount) * start + amount * end;
  };

  useEffect(() => {
    const initButterflies = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const newButterflies: Butterfly[] = [];
      
      for (let i = 0; i < 12; i++) {
        const initialRotation = Math.random() * 360;
        newButterflies.push({
          id: i,
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight,
          size: 0.5 + Math.random() * 0.6,
          currentRotation: initialRotation,
          targetRotation: initialRotation,
          targetX: Math.random() * containerWidth,
          targetY: Math.random() * containerHeight,
          speed: 0.15 + Math.random() * 0.2, 
          wanderAngle: Math.random() * 2 * Math.PI,
          wingFlapSpeed: 4 + Math.random() * 4,
          wingState: Math.random(),
          imageIndex: Math.floor(Math.random() * butterflyImages.length)
        });
      }
      
      setButterflies(newButterflies);
      butterflyDataRef.current = newButterflies;
    };

    initButterflies();
    window.addEventListener('resize', initButterflies);

    const animate = (timestamp: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastUpdateTimeRef.current) / 16.67; // Normalize to 60fps
      lastUpdateTimeRef.current = timestamp;

      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      butterflyDataRef.current.forEach(butterfly => {
        const dx = butterfly.targetX - butterfly.x;
        const dy = butterfly.targetY - butterfly.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
          butterfly.targetX = Math.random() * containerWidth;
          butterfly.targetY = Math.random() * containerHeight;
        }

        butterfly.wanderAngle += (Math.random() - 0.5) * 0.4;
        const wanderX = Math.cos(butterfly.wanderAngle) * 20; // Wander radius
        const wanderY = Math.sin(butterfly.wanderAngle) * 20;

        const totalDx = dx + wanderX;
        const totalDy = dy + wanderY;
        const totalDistance = Math.sqrt(totalDx * totalDx + totalDy * totalDy);
        
        const moveX = (totalDx / totalDistance) * butterfly.speed * deltaTime;
        const moveY = (totalDy / totalDistance) * butterfly.speed * deltaTime;
        butterfly.x += moveX;
        butterfly.y += moveY;

        butterfly.targetRotation = (Math.atan2(moveY, moveX) * 180) / Math.PI + 90;
        butterfly.currentRotation = lerp(butterfly.currentRotation, butterfly.targetRotation, 0.05 * deltaTime);
        
        butterfly.wingState = (butterfly.wingState + (butterfly.wingFlapSpeed / 100) * deltaTime) % 2;

        butterfly.x = Math.max(0, Math.min(containerWidth, butterfly.x));
        butterfly.y = Math.max(0, Math.min(containerHeight, butterfly.y));

        const element = butterflyElementsRef.current.get(butterfly.id);
        if (element) {
          element.style.transform = `translate(${butterfly.x}px, ${butterfly.y}px) rotate(${butterfly.currentRotation}deg) scale(${butterfly.size})`;
          element.style.zIndex = `${Math.floor(butterfly.y)}`;
          
          const wingFlapValue = Math.sin(butterfly.wingState * Math.PI);
          const imgElement = element.firstChild as HTMLImageElement;
          if (imgElement) {
              imgElement.style.transform = `scaleX(${1 - wingFlapValue * 0.8})`;
          }
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', initButterflies);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="butterfly-container bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700/50 bottom-3" ref={containerRef}>
      <div className="content">
        <h1>Chasing Butterflies</h1>
        <p>An interactive animation with realistic butterflies</p>
      </div>
      
      {butterflies.map(b => (
        <div
          key={b.id}
          className="butterfly"
          ref={el => {
            if (el) butterflyElementsRef.current.set(b.id, el);
            else butterflyElementsRef.current.delete(b.id);
          }}
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '50px',
            height: '50px',
            willChange: 'transform', // Performance hint for the browser
          }}
        >
          <img
            src={butterflyImages[b.imageIndex]}
            alt="Butterfly"
            className="butterfly-image"
            style={{
                transition: 'transform 0.05s ease-in-out',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ButterflyAnimation;