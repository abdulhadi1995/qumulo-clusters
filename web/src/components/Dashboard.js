import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from "next/link";

const Dashboard = () => {
    const [clusters, setClusters] = useState([]);
    useEffect(()=>{
        axios.get(process.env.apiUrl + '/clusters/metrics')
        .then(res=>{
            setClusters(res.data?.clusters);
        })
            .catch(err=>console.log(err));
    },[])

    useEffect(() => {
        console.log(clusters)
    }, [clusters]);
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Clusters List</h2>
            <div className="mb-8">
                <ul className="mt-4">
                    {
                        clusters?.map((cluster) => {
                            return (
                                <li className="p-2" key={cluster.id}>
                                    <Link href={{
                                        pathname: '/cluster/[id]',
                                        query: { id: cluster.id },
                                    }}>{cluster.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
