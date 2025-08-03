import { useState } from 'react';
import type { FC } from 'react';

const defaultPlayerImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/200px-Portrait_Placeholder.png';

const PlayerImage: FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <img
        src={hasError ? defaultPlayerImage : src}
        alt={alt}
        className={`w-full h-full object-cover rounded-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default PlayerImage;
