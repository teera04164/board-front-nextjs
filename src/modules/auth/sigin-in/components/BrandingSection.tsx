import Image from 'next/image'
import React from 'react'

const BrandingSection = () => {
    return (
        <div className='h-[50vh] md:w-[40%] md:h-[100vh] bg-green-300 rounded-b-[2.25rem] md:rounded-l-[2.25rem] flex justify-center items-center'>
            <div className="flex gap-11 flex-col justify-center items-center">
                <Image
                    src="/images/board-icon.png"
                    alt="Board Application Logo"
                    priority
                    height={230}
                    width={300}
                />
                <span className="text-white text-2xl font-bold">
                    a Board
                </span>
            </div>
        </div>
    )
}

export default BrandingSection