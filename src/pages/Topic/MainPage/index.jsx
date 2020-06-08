import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import {Button, Card, Input, Select, Upload} from 'antd';
import ProTable from "@ant-design/pro-table";
import { useColumns } from '@/utils/utils';
import FormModal from "@/components/FormModal";
import {PlusOutlined} from "@ant-design/icons";
import {useIntl} from "umi";

const column = [
  'videoName',
  'videoPath',
  'createTime',
  'watchNum',
  'replyList'
];

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

export default () => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const {formatMessage} = useIntl();
  const columns = useColumns(column,
    text => {
      console.log(text);
      return <Button type='link'>
        删除
      </Button>
    }
  );
  return (
    <PageHeaderWrapper>
      <Card
        loading={loading}
      >
        <ProTable
          columns={columns}
          dataSource={[]}
          rowKey='id'
          toolBarRender={() => [
            <Button
              key="3"
              type="primary"
              onClick={() => {
                setEdit(false);
                setVisible(true);
              }}
            >
              <PlusOutlined/>
              新建
            </Button>,
          ]}
        />
      </Card>
      <FormModal
        formName='topic'
        title={`${edit ? '编辑' : '新建'}文章`}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        formItems={Object.keys(formItems).map(formItem => {
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
          return {
            name: formItem,
            component: formItems[formItem],
            extraProps: {...obj},
            rules: [
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
                    id: `form.topic.${formItem}`
                  })
                }！`
              }
            ]
          }
        })}
      />
    </PageHeaderWrapper>
  );
};
