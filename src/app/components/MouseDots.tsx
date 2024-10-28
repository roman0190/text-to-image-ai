"use client"; // Ensure this component is a client component

import { useState, useEffect, useCallback } from "react";

// Define an interface for the dot's position
interface Dot {
  x: number;
  y: number;
  color: string; // Add color property
}

const MouseDots: React.FC = () => {
  // State for mouse position
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // State for dots
  const [dots, setDots] = useState<Dot[]>([]);

  // Function to generate a random color
  const getRandomColor = useCallback(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  // Function to create dots
  const createDots = (count: number) => {
    return Array.from(
      { length: count },
      (): Dot => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: getRandomColor(), // Set initial random color
      })
    );
  };

  // Effect to create initial dots on mount
  useEffect(() => {
    const initialDots = createDots(100);
    setDots(initialDots);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          color: getRandomColor(), // Update to a new random color
        }))
      );
    }, 2000); // Change color every 2 seconds

    return () => clearInterval(interval);
  }, [getRandomColor]);

  useEffect(() => {
    const handleResize = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          x: Math.min(dot.x, window.innerWidth - 10), // Keep dots within width
          y: Math.min(dot.y, window.innerHeight - 10), // Keep dots within height
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    // Initialize dots on resize in case window size changes
    handleResize();

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="md:block md:fixed hidden md:inset-0 md:pointer-events-none">
      {/* Background Dots */}
      {dots.map((dot, index) => {
        // Calculate the distance from the mouse position
        const distance = Math.sqrt(
          (dot.x - mousePosition.x) ** 2 + (dot.y - mousePosition.y) ** 2
        );

        // Determine if the dot should follow the mouse
        const followMouse = distance >= 10 && distance <= 100;

        return (
          <div
            key={index}
            className="blur-dot"
            style={{
              left: `${followMouse ? mousePosition.x : dot.x}px`,
              top: `${followMouse ? mousePosition.y : dot.y}px`,
              background: dot.color, // Set the background color
              transition: followMouse
                ? "left 0.5s ease-out, top 0.5s ease-out"
                : "none", // Smooth transition only when following
            }}
          />
        );
      })}
    </div>
  );
};

export default MouseDots;
