import React, {useState} from 'react'
import {Form, Input, Button, notification, Card, Col, Row} from 'antd'
import {useHistory} from 'react-router-dom'
import {SmileOutlined, FrownOutlined} from '@ant-design/icons';
import {axiosInstance} from "api";
import styled from "styled-components";

const apiUrl = "/user/signup/"


const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(1, 1fr);
    gap:1rem;
	width:1024px;
	max-width:100%;
	margin:10px auto;
`;

export default function Signup() {
    const history = useHistory()
    const [fieldErrors, setFieldErrors] = useState({})

    const onFinish = (values) => {
        async function fn() {
            const {user_id, password, username} = values
            const data = {user_id, password, username  }

            setFieldErrors({})

            try {
                await axiosInstance.post(apiUrl, data)

                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>
                })

                history.push("/accounts/login")
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: "회원가입 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    });

                    const {data: fieldsErrorMessages} = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" ")
                                };
                                return acc;
                            },
                            {}
                        )
                    );
                }
            }
        }

        fn();
    };

    return (
        <Container>
            <Card align="center" title="Sign up">
                <Form
                    onFinish={onFinish}
                >
                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="user_id"
                                name="user_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                    {
                                        min: 2,
                                        message: '2글자를 입력해주세요. ',
                                    }
                                ]}
                                hasFeedback
                                {...fieldErrors.username}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                {...fieldErrors.password}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                label="username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                                {...fieldErrors.email}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row align="center">
                        <Col span={12}>
                            <Form.Item
                                align="center"
                            >
                                <Button type="primary" htmlType="submit" block>
                                    SignUp
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}