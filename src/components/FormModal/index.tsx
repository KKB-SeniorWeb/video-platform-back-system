import { Form, Modal } from "antd";
import React, { ReactNode } from "react";
import { FormInstance, FormItemProps, Rule } from "antd/lib/form";
// @ts-ignore
import { useIntl } from 'umi';

interface IProps {
  title: string;
  visible: boolean;
  onCancel: () => void;
  formItems: IFormItems[];
  formName?: string;
}

/*[
  {
    name: string;
    component: ReactNode;
    rules: RuleObject | RuleRender;
  }
]*/

interface IFormItemsComponent {
  name: string;
  component: ReactNode;
  rules: Rule[];
  extraProps?: FormItemProps;
}

interface IFormItemsRender {
  render: () => ReactNode;
}

type IFormItems = IFormItemsComponent | IFormItemsRender;

interface IFormModal {
  (props: IProps): ReactNode;
  form?: FormInstance;
}

function isRender(formItem: IFormItems): formItem is IFormItemsRender {
  return (formItem as IFormItemsRender).render !== undefined;
}

const FormModal: IFormModal = props => {
  const { formatMessage } = useIntl();
  const { title, visible, onCancel, formItems, formName } = props;
  const [form] = Form.useForm();
  FormModal.form = form;
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
      {
        formItems.map(item =>
          isRender(item) ? item.render() : <Form.Item
            key={item.name}
            label={formatMessage({
              id: `form${formName ? '.' + formName : ''}.${item.name}`
            })}
            name={item.name}
            rules={item.rules}
            {...item.extraProps}
          >
            {
              item.component
            }
          </Form.Item>
        )
      }
    </Form>
  </Modal>
};

export default FormModal;
