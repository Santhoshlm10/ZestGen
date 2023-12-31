import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';


function AddColumn() {

    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="columnName"
                    name="columnName"
                    rules={[{ required: true, message: 'Please enter Column name' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddColumn;