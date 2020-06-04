import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Button, Card } from 'antd';
import ProTable from "@ant-design/pro-table";
import { useColumns } from '@/utils/utils';

const column = [
  'videoName',
  'videoPath',
  'createTime',
  'watchNum',
  'replyList'
];

export default () => {
  const [loading, setLoading] = useState(false);
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
        />
      </Card>
    </PageHeaderWrapper>
  );
};
