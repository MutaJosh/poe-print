import React, {useRef, useState, useEffect} from 'react';
import ReactToPrint from 'react-to-print';
import {Link, useHistory, useParams} from 'react-router-dom'
import {Menu, Modal, Table} from "antd";
import QrCode from 'qrcode.react';
import {useConfig} from '@dhis2/app-runtime';
import {PrinterOutlined, MessageOutlined, HomeOutlined, FormOutlined} from '@ant-design/icons';
import {observer} from "mobx-react";
import {useStore} from "./context/context";
import {isEmpty} from "lodash";
import PDFAttachment from "./PDFAttachment";
import ScriptTag from 'react-script-tag';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import moment from "moment";

import {pdf, Text} from "@react-pdf/renderer";
import axios from "axios";

const InstanceData = observer(() => {
    const store = useStore();
    const [imageUrl, setImageUrl] = useState('');
    const [verifier, setVerifier] = useState('');
    const {baseUrl} = useConfig();
    const params = useParams();
    const AESKey = "COVID-19R35P0N5E-2020";
    const program = store.programId;
    const programStage = store.programStageID;
    const url = window.location.href;

// \nLastname: ${store.currentInstance.ENRjVGxVL6l}
    useEffect(() => {
        store.queryOneInstances(params.instance).then(() => {
            setImageUrl(`${baseUrl}/api/trackedEntityInstances/${store.currentInstance.instance}/AsnwhQvSeMy/image`);
            setVerifier(AES.encrypt(`Unique ID: ${store.currentInstance.he05i8FUwu3} \nFull Name: ${store.currentInstance.sB1IHYu2xQT} \t ${store.currentInstance.ENRjVGxVL6l}  \nDate of birth: ${store.currentInstance.NI0QRzJvQ0k} \nCOVID-19 Test Result: ${store.currentInstance.dDHkBd3X8Ce ? store.currentInstance.dDHkBd3X8Ce.ovY6E8BSdto : ""} \nDate of Test Result: ${store.currentInstance.dDHkBd3X8Ce ? store.currentInstance.dDHkBd3X8Ce.Cl2I1H6Y3oj : moment().format("YYYY-MM-DD h:mm:ss a")}`, AESKey).toString());
        })
    }, [store, params]);

    const sendEmail = async () => {
        // Alert for the email sending
        alert("Email sent successfully!");

        const qrcanvas = document.querySelector('canvas');
        const qrImage = qrcanvas.toDataURL('image/png');
        const nationality = store.options['Countries'][store.currentInstance.hBcoBCZBWFb];
        const blob = await pdf(<PDFAttachment instance={store.currentInstance} verifier={qrImage}
                                              nationality={nationality}/>).toBlob();
        const reader = new FileReader();
        const name = store.currentInstance.sB1IHYu2xQT;
        const email = store.currentInstance.YVZnRB53ymX;
        const fileName = store.currentInstance.sB1IHYu2xQT + "_" + store.currentInstance.ENRjVGxVL6l;
        const testDate = store.currentInstance.iR8O4hSLHnu ? store.currentInstance.LYZbB262AbI.kBNDcbtH4ii : "";

        const body = "Dear " + name + ", \n\nPlease find attached your recent COVID-19 (SARS-CoV-2 RT-PCR) test results for sample taken on " + testDate + " \n\n#StaySafe.\n\n COVID-19 Response Team - Rwanda";
        reader.addEventListener("loadend", async () => {
            const d = reader.result.split("data:application/pdf;base64,");
            await axios.post("https://api.gateplatforms.io/send", {
                subject: "Your recent COVID-19 Test result attached",
                recipient: email,
                body: body,
                fileName,
                attachment: d[1]
            });
        });
        reader.readAsDataURL(blob);

    };

    return (<div>
        {!isEmpty(store.currentInstance) ?
            <div style={{padding: 20, display: 'flex', flexDirection: 'column', fontSize: 'large'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '2px'}}>
                    <div style={{alignContent: 'left', display: 'flex', width: '20%'}}>
                        <img src="rbc.png" style={{width: 250, marginBottom: '5px', marginTop: 5}}/>
                    </div>
                    <div style={{textAlign: 'center', width: '80%'}}>
                        <h3 style={{color: 'green', fontSize: '1.2em', alignItems: 'right'}}>Biomedical Services (BIOS) - National Reference Laboratory</h3>
                        <span style={{fontWeight: 'bolder', textTransform: 'uppercase', fontSize: 20, alignItems: 'center'}}>ACCREDITED ISO-15189:2012</span><br/>
                        <span style={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: 13, alignItems: 'center'}}>COVID-19 Result Report</span>
                    </div>
                </div>
                <div style={{flex: 1, flexDirection: 'column'}}>
                    <div style={{
                        width: '100%',
                        backgroundColor: '#c6d3dc',
                        color: '#FFFFFF',
                        flex: 1,
                        textAlign: 'left',
                        alignContent: 'left',
                        paddingLeft: 10,
                        marginTop: 20
                        }}>
                        <span>Lab Contact Information</span>
                    </div>
                </div>

                <div style={{display: 'flex', padding: 10 }}>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>
                            <span>Address:</span>
                            <span style={{
                                paddingLeft: 5,
                                fontWeight: 'bold',
                                textTransform: "uppercase"
                            }}> PO BOX 4668 KIGALI-RWANDA </span>
                        </div>
                        <div style={{marginTop: 5}}>
                            <span>Telephone:</span>
                            <span style={{
                                paddingLeft: 5,
                                fontWeight: 'bold',
                                textTransform: "uppercase"
                            }}> +(250) 781 415 724 </span>
                        </div>
                        <div style={{marginTop: 5}}>
                            <span>Email:</span>
                            <span style={{paddingLeft: 5, fontWeight: 'bold'}}>
                                covid19@rbc.gov.rw
                            </span>
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
                            paddingLeft: 10,
                            marginTop: 20
                            }} className="section-head">
                            Vital Case Information
                        </div>
                        <div style={{display: 'flex', padding: 10}}>

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div>
                                    <span>Unique ID:</span>
                                    <span style={{
                                        paddingLeft: 5,
                                        fontWeight: 'bolder',
                                        textTransform: "uppercase"
                                    }}>{store.currentInstance.he05i8FUwu3}</span>
                                </div>
                                <div style={{marginTop: 5}}>
                                    <span>Full Name:</span>
                                    <span style={{
                                        paddingLeft: 5,
                                        fontWeight: 'bolder',
                                        textTransform: "uppercase"
                                    }}>{store.currentInstance.sB1IHYu2xQT + " " + store.currentInstance.ENRjVGxVL6l} </span>
                                </div>
                                <div style={{marginTop: 5}}>
                                    <span>Sex:</span>
                                    <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>
                                        {store.currentInstance.oindugucx72}
                                    </span>
                                </div>
                                <div style={{marginTop: 5}}>
                                    <span>Date of Birth:</span>
                                    <span style={{
                                        paddingLeft: 5,
                                        fontWeight: 'bolder',
                                        textTransform: "uppercase"
                                    }}>{store.currentInstance.NI0QRzJvQ0k}</span>
                                </div>
                                <div style={{marginTop: 5}}>
                                    <span>Nationality:</span>
                                    <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>
                                        {store.options['Countries'][store.currentInstance.hBcoBCZBWFb]}
                                    </span>
                                </div>
                            </div>
                            <div style={{marginLeft: "auto", marginRight: '35%'}}>
                                <QrCode value={verifier}
                                        style={{marginBottom: 30, marginTop: 30, width: 128, height: 128}}/>
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
                        paddingLeft: 10
                    }} className="section-head">
                        Address and Contact Information
                    </div>
                    <div style={{display: 'flex', padding: 10, paddingBottom: '2%'}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '70%'}}>

                            <div>
                                <span>Telephone:</span>
                                <span style={{
                                    paddingLeft: 5,
                                    fontWeight: 'bolder',
                                    textTransform: "uppercase"
                                }}>{store.currentInstance.fctSQp5nAYl}</span>
                            </div>
                            <div style={{marginTop: 5}}>
                                <span>Email Address:</span>
                                <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>
                                    {store.currentInstance.YVZnRB53ymX}
                                </span>
                            </div>
                            <div style={{marginTop: 5}}>
                                <span>Country of Residence:</span>
                                <span style={{paddingLeft: 5, fontWeight: 'bolder', textTransform: "uppercase"}}>
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
                        paddingLeft: 10
                    }} className="section-head">
                        COVID-19 Investigation and Tests
                    </div>
                    <div style={{display: 'flex', padding: 10, paddingBottom: '2%'}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <div>
                                <span>Date of Specimen Collection:</span>
                                <span style={{
                                    paddingLeft: 5,
                                    fontWeight: 'bolder'
                                }}>{store.currentInstance.iR8O4hSLHnu ? store.currentInstance.iR8O4hSLHnu.Q98LhagGLFj : ""}</span>
                            </div>
                            <div style={{
                                marginTop: 5,
                                display: 'flex',
                                flexDirection: 'row',
                                flexBasis: '100%',
                                width: '100%'
                            }}>
                                <span>Date of Test Result: </span>
                                <span style={{
                                    paddingLeft: 5,
                                    fontWeight: 'bolder'
                                }}> {store.currentInstance.dDHkBd3X8Ce ? store.currentInstance.dDHkBd3X8Ce.Cl2I1H6Y3oj : moment().format("YYYY-MM-DD h:mm:ss a")}  </span>
                            </div>
                            <div style={{marginTop: 5}}>
                                <span>SARS-CoV-2 RT-PCR Result:</span>
                                <span style={{
                                    paddingLeft: 5,
                                    fontWeight: 'bolder',
                                    textTransform: "uppercase"
                                }}> {store.currentInstance.dDHkBd3X8Ce ? store.currentInstance.dDHkBd3X8Ce.ovY6E8BSdto : ""} </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}} className="approval">
                    <style type="text/css">
                        {`@media print {.approval { display: none; }}`}

                    </style>
                    <style>
                        {`@media print {.section5{color: red;}}`}
                    </style>
                    <div style={{
                        width: '100%',
                        background: '#c6d3dc',
                        backgroundColor: '#c6d3dc',
                        color: '#FFFFFF',
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        paddingLeft: 10
                    }} className="section5">
                        OFFICIAL USE ONLY
                    </div>
                    <div style={{display: 'flex', padding: 20}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexBasis: '100%',
                                    flex: 1,
                                    width: '50%'
                                }}>
                                    <img src="rbc_stamp.png" style={{width: 200, marginBottom: '5px', marginTop: 5}}/>
                                    <span>Date: {store.currentInstance.dDHkBd3X8Ce ? store.currentInstance.dDHkBd3X8Ce.Cl2I1H6Y3oj : moment().format("YYYY-MM-DD h:mm:ss a")}  </span>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexBasis: '100%',
                                    flex: 1,
                                    width: '50%'
                                }}>
                                    <img src="rbc_sign.png" style={{width: 250, marginBottom: '5px', marginTop: 5}}/>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={{marginTop: 5}}>
                                    <span>Validated by Dr. Emil Ivan MWIKARAGO <br/>Division Manager <br/>National Reference Laboratory </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(store.currentInstance.YVZnRB53ymX && store.currentInstance.dDHkBd3X8Ce) ? <div>
                        <style type="text/css">
                            {`@media print {.emailer { display: none; }}`}
                        </style>
                        <div  style={{ textAlign: 'right', paddingRight: '5%', paddingBottom: '3%' }} className="emailer">
                            <button onClick={sendEmail}> SEND AS EMAIL </button>
                        </div>
                    </div> : ""
                    }
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
                    NO DATA AVAILABLE NOW FOR THE SPECIFIED INSTANCE. Please Reload by clicking the link below
                </div>
                <div style={{display: 'flex', padding: 20}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
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
    const history = useHistory();

    return (
        <div>
            <Menu mode="horizontal" theme="light" defaultSelectedKeys={['print']}>
                {store.currentInstance.dDHkBd3X8Ce ?
                    (
                        ((store.currentInstance.dDHkBd3X8Ce.Cl2I1H6Y3oj >= store.currentInstance.iR8O4hSLHnu.Q98LhagGLFj) &&
                            (moment(store.currentInstance.dDHkBd3X8Ce.Cl2I1H6Y3oj).diff(moment(store.currentInstance.iR8O4hSLHnu.Q98LhagGLFj), "days") <= 4)) ?
                        <Menu.Item key="print" style={{marginLeft: 20}}>
                            <ReactToPrint
                                trigger={() => <span>
                                    <PrinterOutlined/> PRINT RESULTS
                                </span>}
                                content={() => componentRef.current}
                                copyStyles={true}
                            />
                        </Menu.Item> : "")
                    : ""
                }
                <Menu.Item key="home">
                    <Link to="/">
                        <HomeOutlined/>
                        BACK TO LIST
                    </Link>
                </Menu.Item>
            </Menu>

            <Instance ref={componentRef}/>

            <Modal
                title={"TRAVELLERS ON: " + store.currentInstance.h6aZFN4DLcR}
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
                                // store.closeDialog();
                                // history.push(`/${record['CLzIR1Ye97b']}`);
                                alert.show("Hello");
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
