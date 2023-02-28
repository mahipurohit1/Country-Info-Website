// export default useWindowSize
import { useEffect, useState } from "react";
// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default useWindowSize;

// import { useState, useEffect } from 'react'

// function useWindowSize() {
//   const isClient = typeof window === 'object'

//   function getSize() {
//     return {
//       width: isClient ? window.innerWidth : undefined,
//       height: isClient ? window.innerHeight : undefined
//     }
//   }

//   const [windowSize, setWindowSize] = useState(getSize)

//   useEffect(() => {
//     if (!isClient) {
//       return false
//     }

//     function handleResize() {
//       setWindowSize(getSize())
//     }

//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return windowSize
// }