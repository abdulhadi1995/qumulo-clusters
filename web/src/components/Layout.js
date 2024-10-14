import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children, name, id }) => {
    return (
        <div className="flex">
            <aside className="md:w-60 hidden md:flex bg-gray-800 text-white h-screen overflow-auto p-4">
                <div className="w-full">
                    <div className="flex items-center gap-2 pb-3 border-b border-[#2D3E4E]">
                        <Link href="/">
                            <Image width={30} height={30} src={'/qumulo.png'} alt={'qumulo-logo'}/>
                        </Link>
                        <h2 className="text-xl text-[#F3F4F4] font-light leading-none">{name ? name : 'Qumulo'}</h2>
                    </div>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link href={`/cluster/${id}`}
                                  className='flex items-center gap-3 py-2 px-4 hover:bg-[#13181E] text-sm text-[#ffffff]'
                            >
                                <div className='w-2 h-2 rounded-full bg-[#ffffff]'></div>
                                Performance Metrics
                            </Link>
                        </li>
                        <li>
                            <Link href={`/policy/${id}`}
                                  className='flex items-center gap-3 py-2 px-4 hover:bg-[#13181E] text-sm text-[#ffffff]'
                            >
                                <div className='w-2 h-2 rounded-full bg-[#ffffff]'></div>
                                Edit Snapshot Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className="flex-1 bg-gray-900 text-white p-2">
                {children}
            </main>
        </div>
    );
};

export default Layout;