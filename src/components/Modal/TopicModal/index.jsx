import {Form, Input, Modal, Select, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useIntl} from "umi";
import React from "react";

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

const TopicModal = props => {
  const [form] = Form.useForm();
  const {formatMessage} = useIntl();
  return <Modal
    title={props.title}
    visible={props.visible}
    okText='保存'
    onCancel={() => {
      props.onCancel();
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
      name='course'
      form={form}
      onFinish={values => {
        console.log(values)
        props.onCancel();
        form.resetFields();
      }}
      onFinishFailed={({values, errorFields, outOfDate}) => {
        console.log({values, errorFields, outOfDate})
      }}
    >
      {Object.keys(formItems).map(formItem => {
        let obj = {};
        if (formItem === 'cover') {
          obj = {
            valuePropName: "fileList",
            getValueFromEvent: e => {
              console.log('Upload event:', e);
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }
          }
        }
        return (
          <Form.Item
            {...obj}
            key={formItem}
            name={formItem}
            label={formatMessage({
              id: `form.course.${formItem}`
            })}
            rules={[
              {
                required: true,
                message: `请
                ${
                  formItem === 'cover' ?
                    '上传' :
                    formItem === 'authorId' ?
                      '选择' :
                      '填写'
                }
                ${
                  formatMessage({
                    id: `form.course.${formItem}`
                  })
                }！`
              }
            ]}
          >
            {
              formItems[formItem]
            }
          </Form.Item>
        )
      })}
    </Form>
  </Modal>
};

export default TopicModal;
