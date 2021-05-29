import React, {useState, useEffect} from 'react'
import {useAppContext} from "../store";
import {useAxios} from "api";
import {Alert} from 'antd'
import Post from "components/Post";
import MenuLayout from "components/MenuLayout";
import AppLayout from "../components/AppLayout";

const apiUrl = "/box/qns/"

export default function Home() {
    const {store: {jwtToken}} = useAppContext()
    const headers = {'TOKEN': `${jwtToken}`}
    const [qnsList, setQnsList] = useState([]);

    const [{data: originQnsList, loading, error}, refetch] = useAxios({
        url: apiUrl,
        headers
    })

    useEffect(() => {
        if (originQnsList) {
            setQnsList(originQnsList.results);
        }
    }, [originQnsList]);

    console.log(qnsList)

    return (
        <div>
            <AppLayout>
                {qnsList && qnsList.length === 0 && <Alert type="warning" message='데이터가없습니다.'/>}
                {qnsList && qnsList.map((qns, index) => <Post post={qns} key={index}/>)}
            </AppLayout>
        </div>
    )
}