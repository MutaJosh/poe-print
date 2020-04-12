import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import {Link} from 'react-router-dom'
import { Layout, Menu, Button } from "antd";
import QrCode from 'qrcode.react';
import { useConfig } from '@dhis2/app-runtime'


import {
  PrinterOutlined, EyeOutlined, HomeOutlined
} from '@ant-design/icons';
import {observer} from "mobx-react";
import {useStore} from "./context/context";

const { Header, Content, Footer } = Layout;

const InstanceData = observer(() => {

  const store = useStore();
  const { baseUrl, apiVersion } = useConfig();

  const imageUrl = `${baseUrl}/api/trackedEntityInstances/${store.currentInstance.instance}/AsnwhQvSeMy/image`;
  const verifier = `${store.currentInstance.instance} - ${store.currentInstance.sB1IHYu2xQT}`;

  return (<div style={{padding: 20, display: 'flex', flexDirection: 'column', fontSize: 'large'}}>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', marginTop: '2px'}}>
        <div style={{display: 'flex',flexDirection: 'column', flexBasis: '5%'}}>
          <img src="moh.png" style={{width: '64px', marginBottom: '5px'}}/>
        </div>
        <div style={{display: 'flex',flexDirection: 'column', flexBasis: '100%', marginLeft: '20px'}}>
          <h3 style={{marginTop: '5px'}}>MOH Disease Surveillance Department</h3>
          <span style={{color: 'green', fontWeight: 'bold', marginTop: '-9px'}}>COVID-19 TravelPASS</span>
        </div>
      </div>
    </div>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{
        width: '100%',
        background: '#d8dce0',
        height: 32,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 20,
        marginTop: 20
      }}>
        Demographic Information
      </div>

      <div style={{display: 'flex', padding: 10}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>
            <span>Full Name:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.sB1IHYu2xQT}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Nationality:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.options["Countries"][store.currentInstance.XvETY1aTxuB]}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Sex:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.FZzQbW8AWVd}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Date of Birth (Age):</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.g4LJbkM0R24}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>National ID (NIN)/Passport No: :</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.oUqWGeHjj5C}</span>
          </div>

        </div>
        <div style={{width: 100, height: 150, background: '#d8dce0', overflow:'hidden', marginLeft: 'auto', float: 'right'}}>
          <img src={imageUrl} alt="Image" style={{maxWidth: '100%',maxHeight: '100%', display: 'block'}}/>
        </div>
      </div>
    </div>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{
        width: '100%',
        background: '#d8dce0',
        height: 32,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 20
      }}>
        Travel Information
      </div>

      <div style={{display: 'flex', padding: 10}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '60%'}}>
          <div>
            <span>Point of Entry:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}></span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.ouname}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Country of Departure:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.options["Countries"][store.currentInstance.cW0UPEANS5t]}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Country of Transit:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.options["Countries"][store.currentInstance.pxcXhmjJeMv]}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Vehicle registration number:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.h6aZFN4DLcR}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Date and Time of entry:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.UJiu0P8GvHt}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Planned duration of stay (in Days) while in Uganda:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.eH7YTWgoHgo}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Physical address while in Uganda (Hotel/village/town/district):</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.ooK7aSiAaGq}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Phone Contact or Next of Kin contact:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.E7u9XdW24SP}</span>
          </div>
        </div>
        <div style={{width: '40%', marginLeft: 40, marginRight: 50, display: 'flex', flexDirection: 'column'}}>
          <div>
            <span>Point of Entry ID:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.CLzIR1Ye97b}</span>
          </div>

          <div style={{border: 'solid black 1px', paddingLeft: 10}}>
            <span>Countries visited in the last 14 days:</span>
            <div style={{paddingLeft: 5, fontWeight: 'bolder'}}>
              <p style={{padding: 0, margin: 0}}>{store.options["Countries"][store.currentInstance.wJpIzoGlb9j]}</p>
              <p style={{padding: 0, margin: 0}}>{store.options["Countries"][store.currentInstance.zhWTXIwd6U1]}</p>
              <p style={{padding: 0, margin: 0}}>{store.options["Countries"][store.currentInstance.x9YWFwwuQnG]}</p>
            </div>
          </div>
          <div style={{marginTop: 20}}>
            <QrCode value={verifier} style={{marginBottom: 20, width: 128, height: 128}} renderAs="svg"/>
          </div>
        </div>
      </div>
    </div>

    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{
        width: '100%',
        background: '#d8dce0',
        height: 32,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 20
      }}>
        COVID-19 Surveillance Investigations
      </div>
      <div style={{display: 'flex', padding:10}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <div>
            <span>Measured temperature:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.QUrkIanwcHD}</span>
          </div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{marginTop: 5,display: 'flex',flexDirection: 'row',flexBasis: '100%', width: '100%'}}>
              <span>Has the specimen been taken?</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.NuRldDwq0AJ}</span>
            </div>
            <div style={{marginTop: 5, display: 'flex',flexDirection: 'row',flexBasis: '100%', paddingLeft: 20}}>
              <span>Specimen Type: </span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.SI7jnNQpEQM}</span>
            </div>
            <div style={{marginTop: 5, display: 'flex',flexDirection: 'row',flexBasis: '100%', paddingLeft: 20}}>
              <span>Type of test: </span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.Bh19lOSuiUC}</span>
            </div>
          </div>
          <div style={{marginTop: 5}}>
            <span>Isolated:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.Ep6evsVocKY}</span>
          </div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{marginTop: 5, display: 'flex',flexDirection: 'row',flexBasis: '100%'}}>
              <span>Referred for further investigation:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.EZwIFcKvSes}</span>
            </div>
            <div style={{marginTop: 5, display: 'flex',flexDirection: 'row', flexBasis: '100%',}}>
              <span>Is individual under quarantine?</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.oVFYcqtwPY9}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{display: 'flex',flexDirection: 'column'}} className="approval">
      <style type="text/css">
        {`@media print {.approval { display: none; }}`}
      </style>
      <div style={{
        width: '100%',
        background: '#d8dce0',
        height: 32,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 20
      }}>
        Approval
      </div>
      <div style={{display: 'flex', padding: 10}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{display: 'flex',flexDirection: 'column', flexBasis: '100%', flex: 1, width: '50%'}}>
              <span>Approved by:</span>
            </div>
            <div style={{display: 'flex',flexDirection: 'column', flexBasis: '100%', flex: 1}}>
              <span>Official Stamp: </span>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{marginTop: 5}}>
              <span>Date: </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
})

class Instance extends React.Component {
  render() {
    return <InstanceData/>;
  }
}

export const TrackedEntityInstance = () => {
  const componentRef = useRef();
  const store = useStore();
  return (
    <div>
      <Menu mode="horizontal" theme="light"  defaultSelectedKeys={['print']}>
        <Menu.Item key="print" style={{marginLeft: 20}}>
          <ReactToPrint
            trigger={() => <span>
                 <PrinterOutlined/> PRINT PASS
                </span>}
            content={() => componentRef.current}
          />
        </Menu.Item>
        <Menu.Item key="group" onClick={store.openDialog}>
          <EyeOutlined/>
          Other travelers on {store.currentInstance.h6aZFN4DLcR}
        </Menu.Item>
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined/>
            Back to List
          </Link>
        </Menu.Item>
      </Menu>

      <Instance ref={componentRef}/>
      <Modal
          title="Other Travellers"
          visible={store.visible}
          onOk={store.closeDialog}
          onCancel={store.closeDialog}
          width="95%"
      >
        <Table
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  store.setCurrentRow(record);
                  store.closeDialog();
                  history.push(`/${record[0]}`);
                },
              };
            }}
            columns={store.columns}
            dataSource={store.otherInstances.rows}
            rowKey={(row) => row[0]}
            pagination={false}
        />
      </Modal>
    </div>
  );
}
