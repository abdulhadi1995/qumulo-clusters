import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import axios from "axios";
import SnapShotPolicy from "@/components/SnapShotPolicy";

const Policy = () => {
    const router = useRouter();

    const [snapshotPolicy, setSnapshotPolicy] = useState([]);
    const [clusterId, setClusterId] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            setClusterId(router.query.id);
        }
    },[router.isReady])


    useEffect(() => {
        axios.get(`${process.env.apiUrl}/clusters/${clusterId}/snapshot-policy`)
            .then(res=>{
                setSnapshotPolicy(res.data);
            })
            .catch(err=>console.log(err));
    }, [clusterId]);
    
    const handleSubmit = (e, data) => {
        e.preventDefault();
        console.log(data)
    }
    
    
    
    return (
        <Layout >
            <SnapShotPolicy snapshot={snapshotPolicy} handleSubmit={handleSubmit}/>
        </Layout>
    );
};

export default Policy;
