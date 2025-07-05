import Image from 'next/image';

interface AvatarProps {
  name: string;
  src?: string; // optional image URL
  size?: 'sm' | 'md' | 'lg';
  bgColor?: string;
  textColor?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-30 h-30 text-[28px]',
};

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
}) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} relative overflow-hidden flex items-center justify-center rounded-full object-cover border-4 border-blue-500`}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" />
      ) : (
        <div
          className={`${bgColor} ${textColor} w-full h-full flex items-center justify-center font-semibold`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};
