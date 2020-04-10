import React, {useEffect} from 'react';
import {Card, Table} from "antd";
import {useStore} from "./context/context";
import {observer} from "mobx-react";

export const Home = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.queryData();
  }, [store]);
  return <div style={{padding: 10, background: '#F7F7F7', 'minHeight': '95vh'}}>
    <Card title="Indicators">
      <Table
        columns={store.columns}
        dataSource={store.trackedEntityInstances.rows}
        rowKey={(row) => row[0]}
      />
    </Card>
  </div>
});
