import React from 'react'
import {Card} from 'antd'

export default function Post({post}) {
    const {question_index, qt_content, answer} = post;

    return (
        <>
            <Card title={qt_content} size="small">
                {answer && answer.map((qns, index) => <div id={index}>{qns["as_content"]}</div>)}
            </Card>
        </>
    )
}