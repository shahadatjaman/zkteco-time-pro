import { Avatar } from '@/shared/avatar';
import Image from 'next/image';
import React from 'react';

interface UserAvatarProps {
  src: string;
  alt: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt }) =>
  src ? (
    <div className="relative w-32 h-32 mx-auto md:mx-auto">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={250}
        className="rounded-full w-full h-full object-cover shadow-lg"
        onError={e => {
          (e.target as HTMLImageElement).src =
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1';
        }}
        loading="lazy"
        quality={100}
      />
    </div>
  ) : (
    <div className="relative w-32 h-32 mx-auto md:mx-auto">
      <Avatar name={alt} size="lg" />
    </div>
  );

export default UserAvatar;
