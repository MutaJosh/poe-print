import {decorate, observable, action, computed} from "mobx";
import {Link} from "react-router-dom";
import React from "react";

export class Store {
  engine;
  trackedEntityInstances = {rows: [], headers: []};
  query = '';
  page = 1;
  pageSize = 15;
  loading = false;

  constructor(engine) {
    this.engine = engine;
  }

  queryData = async () => {
    this.loading = true;
    const {trackedEntityInstances} = await this.engine.query(this.currentQuery);
    this.trackedEntityInstances = trackedEntityInstances;
    this.loading = false;
  }

  get currentQuery() {
    let params = {
      page: this.page,
      totalPages: 'true',
      ouMode: 'ALL',
      program: 'IpHINAT79UW',
      pageSize: this.pageSize
    }
    if (this.query !== '') {
      params = {...params, query: `LIKE:${this.query}`}
    }
    return {
      trackedEntityInstances: {
        resource: 'trackedEntityInstances/query.json',
        params
      }
    }
  }

  get columns() {
    return this.trackedEntityInstances.headers.map((a, i) => {
      return {
        key: a.name,
        title: a.column,
        dataIndex: a.name,
        render: (text, row) => {
          if (i === 0) {
            return <Link to={`/${row[0]}`}>{row[i]}</Link>
          } else {
            return <div>{row[i]}</div>
          }
        }
      }
    });
  }
}

decorate(Store, {
  engine: observable,
  trackedEntityInstances: observable,
  query: observable,
  page: observable,
  pageSize: observable,

  queryData: action,

  currentQuery: computed,
  columns: computed
});
