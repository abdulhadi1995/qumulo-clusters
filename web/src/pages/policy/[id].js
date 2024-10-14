import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import axios from "axios";
import SnapShotPolicy from "@/components/SnapShotPolicy";

const Policy = () => {
    const router = useRouter();
    const {id} = router.query;
    const [snapshotPolicy, setSnapshotPolicy] = useState([]);
  

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`${process.env.apiUrl}/clusters/${id}/snapshot-policy`)
            .then(res=>{
                setSnapshotPolicy(res.data);
            })
            .catch(err=>console.log(err));
    }, [id]);
    
    const handleSubmit = (e, data) => {
        e.preventDefault();
        axios.put(`${process.env.apiUrl}/clusters/${id}/snapshot-policy`, data)
            .then(res=>{
                alert('Successfully updated Snapshot Policy');
            })
            .catch(err=>console.log(err));
    }
    
    
    
    return (
        <Layout id={id}>
            <SnapShotPolicy snapshot={snapshotPolicy} handleSubmit={handleSubmit}/>
        </Layout>
    );
};

export default Policy;
