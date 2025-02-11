import Image from 'next/image';
import React from 'react'

// const DEFAULT_AVATAR = '/images/default-avt.png'
const DEFAULT_AVATAR = '/icons/unknow-user.svg'

export interface AvatarImageProps {
    src?: string;
    alt: string;
    size: number;
    className?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({
    src,
    alt,
    size,
    className,
    ...props
}) => {
    return (
        <div className="avatar">
            <div className="rounded-full">
                <Image
                    src={src ?? DEFAULT_AVATAR}
                    alt={alt}
                    className={`rounded-full ${className}`}
                    width={size}
                    height={size}
                    {...props}
                />
            </div>
        </div>
    )
}

export default AvatarImage