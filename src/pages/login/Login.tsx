import { memo } from 'react'
import { Button, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginAuthMutation } from '../../redux/api/authorization.api';
import { RootState } from '../../redux';
import { setToken } from '../../redux/features/auth.slice';
const { Title } = Typography;

type FieldType = {
    email?: string;
    firstname?: string;
    lastname?: string;
    regionId?: string;
    password?: string;
    img?: string;
};


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = useSelector((state: RootState) => state.auth.email);
    const [loginAuth, { isLoading }] = useLoginAuthMutation();

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        loginAuth(values)
            .unwrap()
            .then((res) => {
                const token = res.token
                if (token) {
                    dispatch(setToken(token))
                    navigate("/my-profile")
                }
            })
    };
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className="max-w-[340px] w-full">
                <Title level={3}>Login</Title>
                <Form
                    name="basic"
                    initialValues={{ email }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button loading={isLoading} className="w-full" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default memo(Login)