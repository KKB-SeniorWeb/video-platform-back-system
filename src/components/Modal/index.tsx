import {Form, Input, Modal} from "antd";
import React, { ReactNode } from "react";
import { Rule } from "antd/lib/form";

interface IProps {
  title: string;
  visible: boolean;
  onCancel: () => void;
  formItems: IFormItems[]
}
/*[
  {
    name: string;
    component: ReactNode;
    rules: RuleObject | RuleRender;
  }
]*/

interface IFormItems {
  name: string;
  component: ReactNode;
  rules: Rule;
}

const FormModal: ReactNode = (props: IProps) => {
  const {title, visible, onCancel} = props;
  const [form] = Form.useForm();
  return <Modal
    title={title}
    visible={visible}
    onCancel={() => {
      onCancel()
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
        onCancel();
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

export default FormModal;
