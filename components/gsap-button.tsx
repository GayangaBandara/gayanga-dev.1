'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GSAPButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  asChild?: boolean;
}

export const GSAPButton: React.FC<GSAPButtonProps> = ({
  children,
  onClick,
  className = '',
  href,
  download = false,
  target,
  rel,
  asChild = false,
}) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current as HTMLAnchorElement | HTMLButtonElement;
    const span = button.querySelector('span');

    if (!span) return;

    const tl = gsap.timeline();

    // Set at center
    tl.set(span, { yPercent: 1 });

    // Go to Top
    tl.to(span, {
      yPercent: -150,
      duration: 0.1,
    });

    // Set to bottom
    tl.set(span, {
      yPercent: 150,
    });

    // Go to Top
    tl.to(span, {
      yPercent: 1,
      duration: 0.1,
    });

    const handleMouseEnter = () => {
      tl.play(0);
    };

    // Play on mouseenter
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const baseStyles = 'relative inline-block overflow-hidden';

  if (href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={`${baseStyles} ${className}`}
      >
        <span className="block">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      <span className="block">
        {children}
      </span>
    </button>
  );
};

export default GSAPButton;
