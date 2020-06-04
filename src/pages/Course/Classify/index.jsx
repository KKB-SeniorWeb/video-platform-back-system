import React, {useState} from 'react';
import ProTable from "@ant-design/pro-table";
import {Card, Button} from "antd";
import {useColumns} from "@/utils/utils";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider, useDrag, useDrop} from "react-dnd";
import update from 'immutability-helper';
import './index.less';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {PlusOutlined} from "@ant-design/icons";
import ClassifyModal from "@/components/Modal/ClassifyModal";

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({index, moveRow, className, style, data, setData, ...restProps}) => {
  const ref = React.useRef();
  const [{isOver, dropClassName}, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const {index: dragIndex} = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index, data, setData);
    },
  });
  const [, drag] = useDrag({
    item: {type, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{
        cursor: 'move',
        ...style
      }}
      {...restProps}
    />
  );
};

const column = [
  'courseType',
  'courseTypeIndex'
];

const components = {
  body: {
    row: DraggableBodyRow,
  },
}

const moveRow = (dragIndex, hoverIndex, data, setData) => {
  const dragRow = data[dragIndex];

  setData(
    update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ]
    }),
  );
};


export default props => {
  const [data, setData] = useState([{id: 1, courseType: '1'}, {id: 2, courseType: '2'}]);
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const columns = useColumns(column, (text, record) => (
    <div>
      <Button
        type="link"
        onClick={() => {
          setEdit(true);
          setVisible(true);
        }}
      >
        编辑
      </Button>
      <Button
        type="link"
      >
        删除
      </Button>
    </div>
  ));
  return (
    <PageHeaderWrapper>
      <Card>
        <DndProvider backend={HTML5Backend}>
          <ProTable
            components={components}
            columns={columns}
            dataSource={
              data.map((item, index) =>
                ({...item, courseTypeIndex: index + 1}))
            }
            rowKey='id'
            onRow={(record, index) => ({
              index,
              moveRow: moveRow,
              data,
              setData
            })}
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
        </DndProvider>
      </Card>
      <ClassifyModal
        title={`${edit ? '编辑' : '新建'}教程分类`}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </PageHeaderWrapper>
  )
};
