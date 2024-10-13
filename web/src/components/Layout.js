import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children, name, id }) => {
    return (
        <div className="flex">
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <div className="flex items-center justify-evenly">
                        <Link href="/">
                            <Image width={30} height={30} src={'/qumulo.png'} alt={'qumulo-logo'}/>
                        </Link>
                        <h2 className="text-lg font-semibold">{name}</h2>
                    </div>

                    <ul className="mt-4">
                        <li className="py-2 px-4 hover:bg-gray-700">
                            <Link href={`/cluster/${id}`}>Performance Metrics</Link>
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-700">
                            <Link href={`/policy/${id}`}>Edit Snapshot Policy</Link>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className="flex-1 bg-gray-900 text-white p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;