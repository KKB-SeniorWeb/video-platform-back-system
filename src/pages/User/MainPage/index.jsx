import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import ProTable from "@ant-design/pro-table";
import {useColumns} from "@/utils/utils";
import {Avatar, Button, Card, Input, Modal, Upload} from "antd";
import TableDropdown from "@ant-design/pro-table/es/component/dropdown";
import {useIntl} from "umi";
import PlusOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

const column = [
  {
    title: 'avatar',
    render: text => (
      <Avatar src={text}/>
    )
  },
  'userName',
  'nickname',
];

export default () => {
  const [visible, setVisible] = useState(false);
  const [change, setChange] = useState('password');
  const [changeItem, setChangeItem] = useState('');
  const {formatMessage} = useIntl();
  useEffect(() => {
  }, []);
  const columns = useColumns(column,
    (text, record, _, actions) => {
      return <div>
        <Button type='link'>
          删除
        </Button>
        <Button type='link'>
          开通管理员
        </Button>
        <TableDropdown
          onSelect={key => {
            setChange(key);
            setVisible(true);
          }}
          menus={[
            {key: 'password', name: '修改密码'},
            {key: 'avatar', name: '修改头像'},
            {key: 'nickname', name: '修改昵称'},
          ]}
        />
      </div>
    }
  );
  return (
    <PageHeaderWrapper>
      <Card>
        <ProTable
          columns={columns}
          dataSource={[{
            id: 111,
            userName: '111',
            nickname: '1111',
            avatar: '1231'
          }]}
          rowKey='id'
          pagination={{
            hideOnSinglePage: true
          }}
        />
      </Card>
      <Modal
        title={`修改${formatMessage({
          id: `modal.${change}`
        })}`}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setChangeItem('');
        }}
        onOk={() => {
          setVisible(false);
          setChangeItem('');
        }}
      >
        {
          change === 'avatar' ?
            <Upload
              accept='image/*'
              listType="picture-card"
            >
              {changeItem ? null : <div>
                <PlusOutlined />
                <div className="ant-upload-text">选择图片</div>
              </div>}
            </Upload> :
            <Input
              value={changeItem}
              onChange={(e) => {
                setChangeItem(e.target.value);
              }}
            />
        }
      </Modal>
      <Modal
        title="是否删除"
      />
    </PageHeaderWrapper>
  );
};
