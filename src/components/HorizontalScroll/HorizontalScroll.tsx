import React, { useState, useRef } from 'react';
import './HorizontalScroll.scss';

export type HorizontalScrollProps = {
  children?: React.ReactNode;
};

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  return (
    <div ref={containerRef} onScroll={checkScroll} style={{ overflow: 'auto' }} className="horizontal-scroll">
      {children}
    </div>
  );
};

export default HorizontalScroll;
