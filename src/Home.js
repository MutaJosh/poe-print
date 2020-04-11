import React, {useEffect} from 'react';
import {Card, Input, Table} from "antd";
import {useStore} from "./context/context";
import {observer} from "mobx-react";
import {useHistory} from 'react-router-dom'

const {Search} = Input;


export const Home = observer(() => {
  const store = useStore();
  const history = useHistory();

  useEffect(() => {
    store.queryData();
  }, [store]);

  return <div style={{padding: 10, background: '#F7F7F7', 'minHeight': '95vh'}}>
    <Card title="Registered and allowed travellers into Uganda - COVID19 Response">
      <Search
        size="large"
        placeholder="input search text"
        allowClear={true}
        onChange={store.onSearch}
        style={{width: '100%', marginBottom: 20}}
      />
      <Table
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              store.setCurrentRow(record);
              history.push(`/${record[0]}`);
            },
          };
        }}
        columns={store.columns}
        dataSource={store.trackedEntityInstances.rows}
        rowKey={(row) => row[0]}
        onChange={store.handleChange}
        pagination={{
          showSizeChanger: true,
          total: store.total,
          pageSize: store.pageSize,
          showQuickJumper: true,
          pageSizeOptions: ['5', '10', '15', '20', '25', '50', '100']
        }}
      />
    </Card>
  </div>
});
