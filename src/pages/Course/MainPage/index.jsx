import React, {useState} from 'react';
import {Button, Card} from "antd";
import ProTable from "@ant-design/pro-table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {useColumns} from "@/utils/utils";
import {PlusOutlined} from "@ant-design/icons";
import CourseModal from "@/components/Modal/TopicModal";

const column = [
  'course',
  // 'courseTypeId',
  'courseCover',
  'courseDescribe',
  'courseVideos'
];

const Index = props => {
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const columns = useColumns(column);
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
      <CourseModal
        title={`${edit ? '编辑' : '新建'}教程`}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </PageHeaderWrapper>
  )
};

export default Index;
