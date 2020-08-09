import React, { useEffect } from 'react'
import 'antd/dist/antd.css';
import {
  HashRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';
import { useDataEngine } from '@dhis2/app-runtime'
import { TrackedEntityInstance } from "./TrackedEntityInstance";
import { Home } from "./Home";
import { PendingResults } from "./PendingResults";
import { Provider } from "./context/context";
import { Store } from "./Store";
import './App.css'
import { Template } from "./Template";
import { Menu, Modal, Table } from "antd";
import { FileDoneOutlined, ExceptionOutlined, BarChartOutlined } from '@ant-design/icons';
import { size } from 'lodash';

const MyApp = () => {
  const engine = useDataEngine();
  const store = new Store(engine);
  return (
    <Provider value={store}>
      <Router>
        <div>
          <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['print']} style={{ display: 'flex', verticalAlign: 'middle' }}>
            <Menu.Item key="print" style={{ marginLeft: 20, alignItems: 'center', display: 'flex' }}>
              <Link to="/">
                <FileDoneOutlined style={{ fontSize: 24 }} />
              READY RESULTS
            </Link>
            </Menu.Item>
            <Menu.Item key="group" onClick={store.openDialog} style={{ alignItems: 'center', display: 'flex', textTransform: "uppercase" }}>

              <Link to="/pending-results">
                <ExceptionOutlined style={{ fontSize: 24 }} />
               PENDING RESULTS
            </Link>
            </Menu.Item>

            <Menu.Item key="home">
              <Link to="/reports">
                <BarChartOutlined style={{ fontSize: 24 }} />
                REPORTS
            </Link>
            </Menu.Item>
          </Menu>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/pending-results">
              <PendingResults />
            </Route>
            <Route exact path="/reports">
              <Home />
            </Route>
            <Route path="/templates/editor">
              <Template />
            </Route>
            <Route path="/:instance">
              <TrackedEntityInstance />
            </Route>
          </Switch>
        </div>

      </Router>
    </Provider>
  )
};
export default MyApp
