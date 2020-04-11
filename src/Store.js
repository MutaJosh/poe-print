import {decorate, observable, action, computed} from "mobx";
import {Link} from "react-router-dom";
import React from "react";
import {fromPairs} from 'lodash';

export class Store {
  engine;
  trackedEntityInstances = {rows: [], headers: []};
  query = '';
  page = 1;
  pageSize = 15;
  loading = false;
  currentRow;

  constructor(engine) {
    this.engine = engine;
  }

  queryData = async () => {
    this.loading = true;
    const {trackedEntityInstances} = await this.engine.query(this.currentQuery);
    this.trackedEntityInstances = trackedEntityInstances;
    this.loading = false;
  };

  setCurrentRow = val => this.currentRow = val;

  get currentQuery() {
    let params = {
      page: this.page,
      totalPages: 'true',
      ouMode: 'ALL',
      program: 'nBWFG3fYC8N',
      pageSize: this.pageSize
    };
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
    const attributes = ["instance", "CLzIR1Ye97b", "sB1IHYu2xQT", "XvETY1aTxuB", "UJiu0P8GvHt", "g4LJbkM0R24", "FZzQbW8AWVd", "oUqWGeHjj5C"];
    return this.trackedEntityInstances.headers.map((a, i) => {
      return {
        key: a.name,
        title: a.column,
        dataIndex: a.name,
        render: (text, row) => {
          return <div>{row[i]}</div>
        }
      }
    }).filter(column => attributes.indexOf(column.key) !== -1);
  }

  get currentInstance() {
    if (this.currentRow) {
      const finalRow = this.trackedEntityInstances.headers.map((col, index) => {
        return [col.name, this.currentRow[index]];
      });
      return fromPairs(finalRow);
    }
    return {};
  }
}


decorate(Store, {
  engine: observable,
  trackedEntityInstances: observable,
  query: observable,
  page: observable,
  pageSize: observable,
  currentRow: observable,

  queryData: action,

  currentQuery: computed,
  currentInstance: computed,
  columns: computed
});
