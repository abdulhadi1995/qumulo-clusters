import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import Layout from "@/components/Layout";
import axios from "axios";

const Cluster = () => {
    const router = useRouter();
    const {id} = router.query;
    
    const [cluster, setCluster] = useState([]);
    const [totalIops, setTotalIops] = useState({});
    const [totalThroughput, setTotalThroughput] = useState({});
   
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`${process.env.apiUrl}/clusters/${id}/metrics`)
            .then(res=>{
                setCluster(res.data?.cluster);
                setTotalIops(res.data?.totalIOPS);
                setTotalThroughput(res.data?.totalThroughput);
            })
            .catch(err=>console.log(err));    
        }, [id]);
    return (
        <Layout name={cluster?.name} id={id}>
            <PerformanceMetrics 
                cluster={cluster}
                totalIops={totalIops}
                totalThroughput={totalThroughput}
            />
        </Layout>
    );
};

export default Cluster;
