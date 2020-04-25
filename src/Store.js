import {decorate, observable, action, computed} from "mobx";
import React from "react";
import {fromPairs, isEmpty, has, flatten} from 'lodash';

export class Store {
  engine;
  trackedEntityInstances = [];
  query = '';
  page = 1;
  total = 0;
  pageSize = 10;
  sorter = 'created:desc';
  currentInstance = {};
  currentHeaders = [];
  otherInstances = [];
  visible = false;
  // programId = 'nBWFG3fYC8N'; //UG
  programId = 'uYjxkTbwRNf'; //RW
  // programStageID = 'geweXwkKtFQ'; //ugandaeidsr.org
  // programStageID = 'r7k02JBxge6'; //eidsr.health.go.ug
  programStageID = 'LpWNjNGvCO5'; //RW
  options = {};
  userOrgUnits = [];

  attributesWithOptionSet = {
    egZSEmMeCeB: 'Countries',
    hBcoBCZBWFb: 'Countries'
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
      me: {
        resource: 'me.json',
        params: {
          fields: 'organisationUnits[id]'
        }
      },
      program: {
        resource: `programs/${this.programId}`,
        params: {
          fields: 'programTrackedEntityAttributes[displayInList,trackedEntityAttribute[id,name]]'
        }
      }
    }
    const {optionSets, program: {programTrackedEntityAttributes}, me: {organisationUnits}} = await this.engine.query(q);
    const processedOptionSets = optionSets.optionSets.map(({name, options}) => {
      const optionsMap = fromPairs(options.map(o => [o.code, o.name]));
      return [name, optionsMap]
    });
    this.options = fromPairs(processedOptionSets);

    this.availableAttributes = programTrackedEntityAttributes.map(({displayInList: selected, trackedEntityAttribute}) => {
      return {...trackedEntityAttribute, selected};
    });
    this.userOrgUnits = organisationUnits.map(ou => ou.id).join(';');
  }

  queryData = async () => {
    await this.queryOptions();
    const {trackedEntityInstances} = await this.engine.query(this.currentQuery);
    const {metaData: {pager}} = trackedEntityInstances;
    this.pageSize = pager.pageSize;
    this.total = pager.total;
    this.page = pager.page;
    this.currentHeaders = trackedEntityInstances.headers;
    const headers = trackedEntityInstances.headers.map(h => h['name']);
    this.trackedEntityInstances = trackedEntityInstances.rows.map(r => {
      return Object.assign.apply({}, headers.map((v, i) => ({
        [v]: r[i]
      })));
    });
  };

  queryOtherInstances = async (vehicleNo) => {
    if (!isEmpty(vehicleNo)) {
      const params = {
        ouMode: 'DESCENDANTS',
        ou: this.userOrgUnits,
        program: this.programId,
        skipPaging: 'true',
        attribute: `h6aZFN4DLcR:EQ:${vehicleNo}`
      };

      const q = {
        trackedEntityInstances: {
          resource: 'trackedEntityInstances/query.json',
          params
        }
      }
      const {trackedEntityInstances} = await this.engine.query(q);
      const headers = trackedEntityInstances.headers.map(h => h['name']);
      this.otherInstances = trackedEntityInstances.rows.map(r => {
        return Object.assign.apply({}, headers.map((v, i) => ({
          [v]: r[i]
        })));
      });
    }
  }

  queryOneInstances = async (instance) => {
    console.log(instance);
    await this.queryOptions();
    const params = {
      program: this.programId,
      fields: '*'
    };
    const q = {
      trackedEntityInstances: {
        resource: `trackedEntityInstances/${instance}.json`,
        params
      }
    };

    const {trackedEntityInstances} = await this.engine.query(q);
    console.log(trackedEntityInstances);
    if (trackedEntityInstances !== undefined) {
      console.log("DATA FOUND");
      const events = trackedEntityInstances.enrollments.filter(p => p.program === this.programId ).map(({events,...enrollmentDetails})=>{
        const evs = events.map(({dataValues,programStage,...others})=>{
          // return {...fromPairs(dataValues.map(dv=>[dv.dataElement,dv.value])),...others,...enrollmentDetails}
          return {...fromPairs(dataValues.map(dv=>[programStage,{[dv.dataElement]:dv.value}])),...others,...enrollmentDetails}
        });
        return evs
      });
      const finalEvents = flatten(events);

      const attributes = trackedEntityInstances.attributes;
      const attributeRow = attributes.map(att=>{
        return [att.attribute, att.value];
      });

      this.currentInstance = fromPairs(attributeRow);
      this.currentInstance = {...this.currentInstance, events:events, instance: instance}
      console.log(this.currentInstance);
      await this.queryOtherInstances(this.currentInstance.h6aZFN4DLcR)
    }
  }

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
      ouMode: 'DESCENDANTS',
      ou: this.userOrgUnits,
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
    return this.currentHeaders.map((a) => {
      return {
        key: a.name,
        title: a.column,
        dataIndex: a.name,
        sorter: true,
        render: (text, row) => {
          if (has(this.attributesWithOptionSet, a.name)) {
            return <div>{this.options[this.attributesWithOptionSet[a.name]][row[a.name]]}</div>
          }
          return <div>{row[a.name]}</div>
        }
      }
    }).filter(column => attributes.indexOf(column.key) !== -1);
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
  currentHeaders: observable,
  currentInstance: observable,
  userOrgUnits: observable,
  programStageID: observable,

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
  queryOneInstances: action,

  currentQuery: computed,
  columns: computed,
});