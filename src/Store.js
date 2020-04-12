import {decorate, observable, action, computed} from "mobx";
import React from "react";
import {fromPairs, isEmpty, has} from 'lodash';

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
  otherInstances = {rows: [], headers: []};
  visible = false;
  programId = 'nBWFG3fYC8N'
  options = {};
  attributesWithOptionSet = {
    XvETY1aTxuB: 'Countries',
    cW0UPEANS5t: 'Countries',
    pxcXhmjJeMv: 'Countries',
    wJpIzoGlb9j: 'Countries',
    zhWTXIwd6U1: 'Countries',
    x9YWFwwuQnG: 'Countries'
  }
  availableAttributes = [];

  constructor(engine) {
    this.engine = engine;
  }

  queryOptions = async () => {
    const q = {
      optionSets: {
        resource: 'optionSets.json',
        params: {
          fields: 'id,name,options[code,name]',
          paging: 'false',
          filter: 'name:in:[Countries]'
        }
      },
      program: {
        resource: `programs/${this.programId}`,
        params: {
          fields: 'programTrackedEntityAttributes[displayInList,trackedEntityAttribute[id,name]]'
        }
      }
    }
    const {optionSets, program: {programTrackedEntityAttributes}} = await this.engine.query(q);
    const processedOptionSets = optionSets.optionSets.map(({name, options}) => {
      const optionsMap = fromPairs(options.map(o => [o.code, o.name]));
      return [name, optionsMap]
    });
    this.options = fromPairs(processedOptionSets);

    this.availableAttributes = programTrackedEntityAttributes.map(({displayInList: selected, trackedEntityAttribute}) => {
      return {...trackedEntityAttribute, selected};
    });
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

  queryOtherInstances = async () => {
    if (!isEmpty(this.currentInstance) && !isEmpty(this.currentInstance.h6aZFN4DLcR)) {
      const params = {
        ouMode: 'ALL',
        program: this.programId,
        skipPaging: 'true',
        query: this.currentInstance.h6aZFN4DLcR
      };

      const q = {
        trackedEntityInstances: {
          resource: 'trackedEntityInstances/query.json',
          params
        }
      }
      const {trackedEntityInstances} = await this.engine.query(q);
      this.otherInstances = trackedEntityInstances;
    }

  }

  setCurrentRow = val => this.currentRow = val;

  onSearch = async (e) => {
    this.page = 1;
    this.query = e.target.value;
    await this.queryData();
  }

  handleChange = async (pagination, filters, sorter) => {
    const order = sorter.field && sorter.order ? `${sorter.field}:${sorter.order === 'ascend' ? 'asc' : 'desc'}` : 'created:desc';
    const page = pagination.pageSize !== this.pageSize || order !== this.sorter ? 1 : pagination.current;
    this.sorter = order;
    this.page = page;
    this.pageSize = pagination.pageSize
    await this.queryData();
  }

  setVisible = val => this.visible = val;

  openDialog = () => this.setVisible(true);

  closeDialog = () => this.setVisible(false);

  setAvailableAttributes = val => this.availableAttributes = val

  includeColumns = (id) => (e) => {
    const attributes = this.availableAttributes.map((col) => {
      if (col.id === id) {
        return {...col, selected: e.target.checked}
      }
      return col;
    });
    this.setAvailableAttributes(attributes);
  }

  get currentQuery() {
    let params = {
      page: this.page,
      totalPages: 'true',
      ouMode: 'ALL',
      program: this.programId,
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
    const attributes = this.availableAttributes.filter(a => a.selected).map(a => a.id);
    return this.trackedEntityInstances.headers.map((a, i) => {
      return {
        key: a.name,
        title: a.column,
        dataIndex: a.name,
        sorter: true,
        render: (text, row) => {
          if (has(this.attributesWithOptionSet, a.name)) {
            return <div>{this.options[this.attributesWithOptionSet[a.name]][row[i]]}</div>
          }
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
  visible: observable,
  options: observable,
  attributesWithOptionSet: observable,
  availableAttributes: observable,

  queryData: action,
  handleChange: action,
  onSearch: action,
  setVisible: action,
  openDialog: action,
  closeDialog: action,
  queryOtherInstances: action,
  queryOptions: action,
  setAvailableAttributes: action,
  includeColumns: action,

  currentQuery: computed,
  currentInstance: computed,
  columns: computed
});
