import React, {useRef, useState, useEffect} from 'react';
import ReactToPrint from 'react-to-print';
import {Link, useHistory, useParams} from 'react-router-dom'
import {Menu, Modal, Table} from "antd";
import QrCode from 'qrcode.react';
import {useConfig} from '@dhis2/app-runtime';
import {PrinterOutlined, EyeOutlined, HomeOutlined, FormOutlined} from '@ant-design/icons';
import {observer} from "mobx-react";
import {useStore} from "./context/context";
import {isEmpty} from "lodash";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const InstanceData = observer(() => {
    const store = useStore();
    const [imageUrl, setImageUrl] = useState('');
    const [verifier, setVerifier] = useState('');
    // const [finalVerifier, setFinalVerifier] = useState('');
    const {baseUrl} = useConfig();
    const params = useParams();
    const AESKey = "COVID-19R35P0N5E-2020";
    // const appCrypt = new SimpleCrypto(AESKey);
    const program = store.programId;
    const programStage = store.programStageID;
    const url = window.location.href;
    const qr_dhis2_url = url.split("/api/")[0];


    useEffect(() => {
        store.queryOneInstances(params.instance).then(() => {
            setImageUrl(`${baseUrl}/api/trackedEntityInstances/${store.currentInstance.instance}/AsnwhQvSeMy/image`);
            setVerifier(AES.encrypt(`Case ID: ${store.currentInstance.he05i8FUwu3} \nFirstname: ${store.currentInstance.sB1IHYu2xQT} \nLastname: ${store.currentInstance.ENRjVGxVL6l} \nDate of birth: ${store.currentInstance.NI0QRzJvQ0k} \nPhone Number: ${store.currentInstance.fctSQp5nAYl} \nNationality: ${store.options['Countries'][store.currentInstance.hBcoBCZBWFb]}`, AESKey).toString());
        })
    }, [store, params])


    // console.log(textstring);
    // console.log(JSON.stringify(store.currentInstance, null, 2));

  return (<div>
    {!isEmpty(store.currentInstance) ?
        <div style={{padding: 20, display: 'flex', flexDirection: 'column', fontSize: 'large'}}>
          <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '2px'}}>
              <div style={{display: 'flex', flexDirection: 'column', flexBasis: '5%'}}>
                <img src="rwanda.png" style={{width: '64px', marginBottom: '5px', marginTop: 5}}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', flexBasis: '100%', marginLeft: '10px'}}>
                <h3 style={{marginTop: '5px', textTransform: 'uppercase', marginLeft: 20}}>Republic of Rwanda</h3>
                <span style={{fontWeight: 'bold', marginTop: '-18px',  textTransform: 'uppercase', fontSize: '1.5em'}}>Ministry of Health</span>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>

            <div style={{
              width: '100%',
              background: '#c6d3dc',
                color: '#FFFFFF',
              height: 32,
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              paddingLeft: 20,
              marginTop: 20
            }}>
              Vital Case Information
            </div>
            <div style={{display: 'flex', padding: 10}}>

              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                  <span>Case Unique ID:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>{store.currentInstance.he05i8FUwu3}</span>
                </div>
                <div style={{marginTop: 5}}>
                  <span>Full Name:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>{store.currentInstance.sB1IHYu2xQT + " " + store.currentInstance.ENRjVGxVL6l} </span>
                </div>
                <div style={{marginTop: 5}}>
                  <span>Sex:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>
                      {store.currentInstance.oindugucx72}
                  </span>
                </div>
                <div style={{marginTop: 5}}>
                  <span>Date of Birth:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>{store.currentInstance.NI0QRzJvQ0k}</span>
                </div>
                <div style={{marginTop: 5}}>
                  <span>Nationality:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>
                      {store.options['Countries'][store.currentInstance.hBcoBCZBWFb]}
                  </span>
                </div>
              </div>
                <div style={{marginLeft: "auto", marginRight: 30}}>
                    <QrCode value={verifier} style={{marginBottom: 30, marginTop: 30, width: 128, height: 128}} renderAs="svg"/>
                </div>

                {/*<div style={{marginTop: 20}}>*/}
                {/*    <QrCode value={verifier} style={{marginBottom: 20, width: 128, height: 128}} renderAs="svg"/>*/}
                {/*</div>*/}
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
              width: '100%',
                background: '#c6d3dc',
                color: '#FFFFFF',
              height: 32,
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              paddingLeft: 20
            }}>
              Address and Contact Information

            </div>
            <div style={{display: 'flex', padding: 10}}>
              <div style={{display: 'flex', flexDirection: 'column', width: '70%'}}>

                <div>
                  <span>Telephone (local):</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>{store.currentInstance.fctSQp5nAYl}</span>
                </div>
                <div style={{marginTop: 5}}>
                  <span>Email Address:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>
                 {store.options['Countries'][store.currentInstance.YVZnRB53ymX]}
                </span>
                </div>
                <div style={{marginTop: 5}}>
                  <span>Country of Residence:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder',textTransform: "uppercase"}}>
                  {store.options['Countries'][store.currentInstance.egZSEmMeCeB]}
                </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
              width: '100%',
                background: '#c6d3dc',
                color: '#FFFFFF',
              height: 32,
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              paddingLeft: 20
            }}>
              COVID-19 Investigation and Tests
            </div>
            <div style={{display: 'flex', padding: 10}}>
              <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <div>
                  <span>Date Specimen Collected:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.iR8O4hSLHnu?store.currentInstance.iR8O4hSLHnu.Q98LhagGLFj:""}</span>
                </div>
                <div style={{marginTop: 5, display: 'flex', flexDirection: 'row', flexBasis: '100%', width: '100%'}}>
                  <span>Date Specimen recieved: </span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.LYZbB262AbI?store.currentInstance.LYZbB262AbI.kBNDcbtH4ii: ""}</span>
                </div>
                <div style={{marginTop: 5}}>
                  <span>Test Result:</span>
                  <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.dDHkBd3X8Ce?store.currentInstance.dDHkBd3X8Ce.ovY6E8BSdto: ""}</span>
                </div>
                  <div style={{marginTop: 5}}>
                      <span>Has the case traveled in the 14 days prior to symptoms onset? </span>
                      <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.LpWNjNGvCO5?store.currentInstance.LpWNjNGvCO5.TzqawmlPkI5:""}</span>
                  </div>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}} className="approval">
            <style type="text/css">
              {`@media print {.approval { display: none; }}`}
            </style>
            <div style={{
              width: '100%',
                background: '#c6d3dc',
                color: '#FFFFFF',
              height: 32,
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              paddingLeft: 20
            }}>
              OFFICIAL USE ONLY
            </div>
            <div style={{display: 'flex', padding: 20}}>
              <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style={{display: 'flex', flexDirection: 'column', flexBasis: '100%', flex: 1, width: '50%'}}>
                    <span>Approved by:</span>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', flexBasis: '100%', flex: 1}}>
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
        </div> : <div style={{padding: 20, display: 'flex', flexDirection: 'column', fontSize: 'large'}}>

          <div style={{
            width: '100%',
            background: '#d8dce0',
            height: 32,
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            paddingLeft: 20
          }}>
            NO DATA FOR AVAILABLE NOW FOR THE SPECIFIED INSTANCE. Please Reload by clicking the link below
          </div>
          <div style={{display: 'flex', padding: 20}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%',alignItems: 'center', alignContent: 'center' }}>
              <span style={{marginTop: 30}}>
              <Link to="/">
                  <HomeOutlined/> BACK TO LIST
                </Link>
            </span>
            </div>
          </div>
        </div>}
  </div>)
})

class Instance extends React.Component {
  render() {
    return <InstanceData/>;
  }
}

export const TrackedEntityInstance = observer(() => {
  const componentRef = useRef();
  const store = useStore();

  // console.log(store);
  const history = useHistory();
  return (
      <div>
        <Menu mode="horizontal" theme="light" defaultSelectedKeys={['print']}>
          <Menu.Item key="print" style={{marginLeft: 20}}>
            <ReactToPrint
                trigger={() => <span>
                 <PrinterOutlined/> PRINT RESULTS
                </span>}
                content={() => componentRef.current}
            />
          </Menu.Item>
          <Menu.Item key="home">
            <Link to="/">
              <HomeOutlined/>
              BACK TO LIST
            </Link>
          </Menu.Item>
        </Menu>

        <Instance ref={componentRef}/>

        <Modal
            title= {"TRAVELLERS ON: " + store.currentInstance.h6aZFN4DLcR}
            visible={store.visible}
            onOk={store.closeDialog}
            onCancel={store.closeDialog}
            width="95%"
            style={{overflow: "auto", textTransform: "uppercase"}}
            bodyStyle={{overflow: "auto"}}
        >
          <Table
              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    store.closeDialog();
                    history.push(`/${record['CLzIR1Ye97b']}`);
                  },
                };
              }}
              columns={store.columns}
              dataSource={store.otherInstances}
              rowKey="instance"
              pagination={false}
              style={{width: '100%'}}
              size="small"
          />
        </Modal>
      </div>
  );
})
