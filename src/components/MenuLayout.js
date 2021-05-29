import React from 'react'
import {Avatar, Menu, notification, Button} from "antd";
import {deleteToken, useAppContext} from "../store";
import {useHistory} from 'react-router-dom'
import {SmileOutlined} from "@ant-design/icons";

const {SubMenu} = Menu;

export default function MenuLayout({author}) {
    const {store: {isAuthenticated}, dispatch} = useAppContext()
    const history = useHistory()

    const Logout = () => {
        async function fn() {
            try {
                dispatch(deleteToken(""))
                notification.open({
                    message: "로그아웃 성공",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>
                })

                history.push('/')
            } catch (error) {
                console.log(error.response)
            }
        }

        fn()
    }

    return (
        <>
            {isAuthenticated}
            <Menu mode="horizontal">
                <Menu.Item>
                    여기옆에
                </Menu.Item>
                <Menu.Item>
                    동그란거 클릭하면 로그아웃있어요
                </Menu.Item>
                <SubMenu key="sub1" icon={<Avatar size="large"/>}>
                    <Menu.Item key="1" onClick={() => {
                        Logout()
                    }}>
                        <span>Logout</span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </>
    )
}