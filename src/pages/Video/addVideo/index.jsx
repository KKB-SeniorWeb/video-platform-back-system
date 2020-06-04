import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Button, Card, Upload } from "antd";
import UploadList from "../../../components/List/UploadList";

export default () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    console.log(files)
  }, [files]);
  return (
    <PageHeaderWrapper>
      <Card>
        <Upload
          accept='.mp4'
          beforeUpload={() => false}
          onChange={file => {
            setFiles(file.fileList);
          }}
          multiple
          showUploadList={false}
        >
          <Button type="primary">
            选择需要上传的视频
          </Button>
        </Upload>
        <UploadList data={files} setFiles={setFiles} />
      </Card>
    </PageHeaderWrapper>
  );
};
