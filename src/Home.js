import React, {useEffect} from 'react';
import {Card, Table} from "antd";
import {useStore} from "./context/context";
import {observer} from "mobx-react";
import {useHistory} from 'react-router-dom'

export const Home = observer(() => {
  const store = useStore();
  const history = useHistory();

  useEffect(() => {
    store.queryData();
  }, [store]);

  return <div style={{padding: 10, background: '#F7F7F7', 'minHeight': '95vh'}}>
    <Card title="Registered and allowed travellers into Uganda - COVID19 Response">
      <Table
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
      />
    </Card>
  </div>
});
