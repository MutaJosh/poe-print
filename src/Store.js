import {decorate, observable, action, computed} from "mobx";
import React from "react";
import {fromPairs} from 'lodash';

export class Store {
  engine;
  trackedEntityInstances = {rows: [], headers: []};
  query = '';
  page = 1;
  total = 0;
  pageSize = 10;
  sorter = 'created:desc';
  loading = false;
  currentRow;

  constructor(engine) {
    this.engine = engine;
  }

  queryData = async () => {
    this.loading = true;
    const {trackedEntityInstances} = await this.engine.query(this.currentQuery);
    const {metaData: {pager}} = trackedEntityInstances;
    this.pageSize = pager.pageSize;
    this.total = pager.total;
    this.page = pager.page;
    this.trackedEntityInstances = trackedEntityInstances;
    this.loading = false;
  };

  setCurrentRow = val => this.currentRow = val;

  onSearch = async (e) => {
    this.page = 1;
    this.query = e.target.value;
    await this.queryData();
  }

  handleChange = async (pagination, filters, sorter) => {
    console.log(sorter);
    const order = sorter.field && sorter.order ? `${sorter.field}:${sorter.order === 'ascend' ? 'asc' : 'desc'}` : 'created:desc';
    const page = pagination.pageSize !== this.pageSize || order !== this.sorter ? 1 : pagination.current;
    this.sorter = order;
    this.page = page;
    this.pageSize = pagination.pageSize
    await this.queryData();
  }

  get currentQuery() {
    let params = {
      page: this.page,
      totalPages: 'true',
      ouMode: 'ALL',
      program: 'nBWFG3fYC8N',
      pageSize: this.pageSize,
      order: this.sorter
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
    const attributes = ["CLzIR1Ye97b", "sB1IHYu2xQT", "XvETY1aTxuB", "UJiu0P8GvHt", "g4LJbkM0R24", "FZzQbW8AWVd", "oUqWGeHjj5C"];
    return this.trackedEntityInstances.headers.map((a, i) => {
      return {
        key: a.name,
        title: a.column,
        dataIndex: a.name,
        sorter: true,
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
  total: observable,

  queryData: action,
  handleChange: action,
  onSearch: action,

  currentQuery: computed,
  currentInstance: computed,
  columns: computed
});
