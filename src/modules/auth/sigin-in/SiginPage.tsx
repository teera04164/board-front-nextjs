"use client";
import React from 'react'
import Image from 'next/image'
const SiginPage = () => {

    
    return (
        <>
            <div className='h-[50vh] min-h-[50%] md:w-[60%] md:h-full md:min-h-screen'>
                <div className='w-full max-w-[384px] md:min-h-screen flex flex-col justify-center items-center mx-auto'>
                    <div className='w-full flex justify-start mb-10'>
                        <h1 className="text-3xl font-bold text-center mt-8 text-white">Sign In</h1>
                    </div>
                    <input type="text" placeholder="Username" className="input input-bordered w-full mb-5" />
                    <button className="btn btn-primary w-full text-white">Sign In</button>
                </div>
            </div>
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
        </>
    )
}

export default SiginPage