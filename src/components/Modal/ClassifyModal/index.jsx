import {Form, Input, Modal} from "antd";
import React from "react";

const ClassifyModal = props => {
  const [form] = Form.useForm();
  return <Modal
    title={props.title}
    visible={props.visible}
    onCancel={() => {
      props.onCancel()
      form.resetFields();
    }}
    onOk={async () => {
      try {
        await form.validateFields();
        form.submit();
      } catch (e) {

      }
    }}
  >
    <Form
      name="form"
      form={form}
      onFinish={values => {
        console.log(values)
        props.onCancel();
        form.resetFields();
      }}
    >
      <Form.Item
        label="教程分类名称"
        name='courseType'
        rules={[
          {
            required: true,
            message: '请输入教程分类名称！',
            whitespace: true
          }
        ]}
      >
        <Input/>
      </Form.Item>
    </Form>
  </Modal>
};

export default ClassifyModal;
