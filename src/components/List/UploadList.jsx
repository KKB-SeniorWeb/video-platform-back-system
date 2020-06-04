import React, {useEffect, useState, useRef, useContext} from 'react';
import {Table, Button, Form, Input, Upload} from "antd";
import './index.less';
import PlusOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

const EditableContext = React.createContext();

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({[dataIndex]: record[dataIndex]});
  };

  const save = async e => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({...record, ...values});
    } catch (errInfo) {
    }
  };
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{margin: 0}}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableRow = ({index, ...props}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

const column = setData => [
  {
    title: '视频名称',
    dataIndex: 'videoName',
    editable: true
  },
  {
    title: '视频封面',
    dataIndex: 'videoCover',
    render: (text, record) => {
      let recordClone = {...record};
      return <Upload
        accept='image/*'
        listType="picture-card"
        onChange={file => {
          console.log(file);
        }}
      >
        {record.videoCover ? null : <div>
          <PlusOutlined />
          <div className="ant-upload-text">上传</div>
        </div>}
      </Upload>
    }
  },
  {
    title: '操作',
    render: (text, record) => {
      return (
        <Button
          type='link'
          onClick={() => {
            setData(record.id);
          }}
        >
          删除
        </Button>
      )
    }
  }
];

const UploadList = props => {
  const [data, setData] = useState([]);
  const {setFiles} = props;
  useEffect(() => {
    let data;
    data = props.data.map(item => ({
      id: item.uid,
      videoName: item.name,
      videoCover: ''
    }));
    setData(data);
  }, [props.data]);

  const handleSave = row => {
    const newData = [...data];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
  };

  const removeFile = (id) => {
    const newData = props.data.filter(item => item.uid !== id);
    setFiles(newData);
  };

  const columns = column(removeFile).map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <Table
      style={{
        marginTop: 20
      }}
      components={components}
      bordered
      rowClassName={() => 'editable-row'}
      columns={columns}
      dataSource={data}
      rowKey='id'
      pagination={{
        hideOnSinglePage: true
      }}
    />
  )
};

export default UploadList;
