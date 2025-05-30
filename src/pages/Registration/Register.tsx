import React from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import type { FormProps } from "antd";
import { RootState } from "../../redux";
import { useGetRegionsQuery } from "../../redux/api/region.api";
import { useRegisterAuthMutation } from "../../redux/api/authorization.api";
import { useNavigate } from "react-router-dom";
import FIleUpload from "../FIleUpload/FIleUpload";

type FieldType = {
    email?: string;
    firstname?: string;
    lastname?: string;
    regionId?: string;
    password?: string;
    img?: string;
};

const Register = () => {
    const imageUrl = useSelector((state: RootState) => state.auth.image)

    const navigate = useNavigate()
    const email = useSelector((state: RootState) => state.auth.email);
    const { data } = useGetRegionsQuery({});
    const options = data?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
    }));
    const [registerAuth, { isLoading }] = useRegisterAuthMutation();

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        registerAuth({ ...values, img: imageUrl })
            .unwrap()
            .then(() => {
                console.log(values);

                navigate("/login")
            })
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="max-w-[340px] w-full">
                <Form
                    name="basic"
                    initialValues={{ email }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <div className="flex items-center justify-center">
                        <FIleUpload />
                    </div>
                    <Form.Item<FieldType>
                        label="First name"
                        name="firstname"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Last name"
                        name="lastname"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Region"
                        name="regionId"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Select
                            placeholder="Select region"
                            options={options}
                        />
                    </Form.Item>

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
                        rules={[{ required: true, message: "Please input your email!" }]}
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
    );
};

export default React.memo(Register);
