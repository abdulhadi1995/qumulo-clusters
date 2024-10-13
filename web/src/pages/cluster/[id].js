import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import Layout from "@/components/Layout";
import axios from "axios";

const Cluster = () => {
    const router = useRouter();
    
    const [cluster, setCluster] = useState([]);
    const [clusterId, setClusterId] = useState(null);
    
    useEffect(() => {
        if (router.isReady) {
            setClusterId(router.query.id);
        }
    },[router.isReady])
    
    
    useEffect(() => {
        console.log(setClusterId);
        axios.get(`${process.env.apiUrl}/clusters/${clusterId}/metrics`)
            .then(res=>{
                setCluster(res.data);
            })
            .catch(err=>console.log(err));    
        }, [clusterId]);
    return (
        <Layout name={cluster?.name} id={cluster?.id}>
            <PerformanceMetrics cluster={cluster}/>
        </Layout>
    );
};

export default Cluster;
