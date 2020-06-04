import {Form, Input, Modal, Select, Upload} from "antd";
import React from "react";
import {PlusOutlined} from "@ant-design/icons";

const formItems = {
  title: <Input/>,
  cover: <Upload
    listType="picture-card"
  >
    {'' ? null : <div>
      <PlusOutlined/>
      <div className="ant-upload-text">上传</div>
    </div>}
  </Upload>,
  describe: <Input/>,
  content: <Input.TextArea/>,
  authorId: <Select/>
};

const CourseModal = props => {
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
        console.log(values);
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

export default CourseModal;
