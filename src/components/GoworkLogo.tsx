import React from 'react';

interface GoworkLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'symbol';
  size?: 'small' | 'medium' | 'large';
}

export function GoworkLogo({ className = '', variant = 'full', size = 'medium' }: GoworkLogoProps) {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };

  // Apenas o símbolo (G estilizado)
  if (variant === 'symbol') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <img 
          src="/assets/logos/gowork-symbol.svg" 
          alt="Gowork Symbol" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Versão compacta (símbolo + texto)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${sizeClasses[size]} ${className}`}>
        <img 
          src="/assets/logos/gowork-symbol.svg" 
          alt="Gowork Symbol" 
          className="h-full w-auto object-contain"
        />
        <span className="font-bold text-foreground tracking-tight whitespace-nowrap">GOWORK.</span>
      </div>
    );
  }

  // Versão completa (logo completo com símbolo e texto)
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="/assets/logos/gowork-full.svg" 
        alt="Gowork Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
