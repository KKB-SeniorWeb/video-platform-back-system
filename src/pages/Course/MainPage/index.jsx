import React, {useState} from 'react';
import {Button, Card, Form, Input, Select, Upload, Popover, Table, Modal} from "antd";
import ProTable from "@ant-design/pro-table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {useColumns} from "@/utils/utils";
import {PlusOutlined} from "@ant-design/icons";
import FormModal from "@/components/FormModal";
import {useIntl} from "umi";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const column = [
  'course',
  // 'courseTypeId',
  'courseCover',
  'courseDescribe',
  'courseVideos'
];

const {form} = FormModal

const courseVideoItem = () => {
  const [contentVisible, setContentVisible] = useState(false);
  return (<Form.Item
      name="courseVideos"
      label={formatMessage({
        id: `form.courseVideos`
      })}
      key="courseVideos"
    >
      <Popover
        trigger="click"
        title="选择教程视频"
        visible={wrapVisible}
        content={() => (
          <>
            <Popover
              trigger="click"
              visible={contentVisible}
              content={() => (
                <div>
                  <Table
                    rowSelection={[]}
                    column={[]}
                    dataSource={[]}
                  />
                  <div style={{
                    overflow: 'hidden'
                  }}>
                    <Button
                      style={{
                        float: 'right',
                        marginLeft: '10px'
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        float: 'right'
                      }}
                    >
                      确定
                    </Button>
                  </div>
                </div>
              )}
            >
              <Button
                type='primary'
                onClick={() => {
                  setContentVisible(true)
                }}
              >
                选择视频
              </Button>
            </Popover>
            <DndProvider backend={HTML5Backend}>

            </DndProvider>
          </>
        )}
      >

      </Popover>
    </Form.Item>
  )
};

const Index = props => {
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const columns = useColumns(column);
  const {formatMessage} = useIntl();
  const [wrapVisible, setWrapVisible] = useState(false);
  return (
    <PageHeaderWrapper>
      <Card>
        <ProTable
          columns={columns}
          dataSource={[]}
          rowKey='id'
          pagination={{
            hideOnSinglePage: true
          }}
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
        title={`${edit ? '编辑' : '新建'}教程`}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        formItems={[
          {
            name: 'course',
            component: <Input/>,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写教程名字！'
              }
            ]
          },
          {
            name: 'courseTypeId',
            component: <Select/>,
            rules: [
              {
                required: true,
                message: '请选择对应教程分类！'
              }
            ]
          },
          {
            name: 'courseCover',
            component: <Upload
              listType="picture-card"
            >
              {'' ? null : <div>
                <PlusOutlined/>
                <div className="ant-upload-text">上传</div>
              </div>}
            </Upload>,
            rules: [
              {
                required: true,
                message: '请选择对应教程分类！'
              }
            ],
            extraProps: {
              valuePropName: "fileList",
              getValueFromEvent: e => {
                console.log('Upload event:', e);
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }
            }
          },
          {
            name: 'courseDescribe',
            component: <Input.TextArea/>,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请选择对应教程分类！'
              }
            ]
          },
          {
            render: () => (
              <Form.Item
                name="courseVideos"
                label={formatMessage({
                  id: `form.courseVideos`
                })}
                key="courseVideos"
              >
                <Button
                  type='primary'
                  onClick={() => {
                    setWrapVisible(true);
                  }}
                >
                  选择教程视频
                </Button>
              </Form.Item>
            )
          }
        ]}
      />
      <Modal
        title="选择教程视频"
        
      >

      </Modal>
    </PageHeaderWrapper>
  )
};

export default Index;
