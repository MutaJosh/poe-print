import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import {useParams} from 'react-router-dom'
import {Button, Descriptions, Menu} from "antd";
import QrCode from 'qrcode.react';

import {
  PrinterOutlined, EyeOutlined, HomeOutlined
} from '@ant-design/icons';


class Instance extends React.Component {
  render() {
    return (<div style={{padding: 20, display: 'flex', flexDirection: 'column', fontSize: 'large'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <QrCode value="OivI21UUUhG" style={{marginBottom: 20, width: 64, height: 64}} renderAs="svg" />
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{
          width: '100%',
          background: '#d8dce0',
          height: 50,
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          paddingLeft: 20
        }}>
          Demographic Information
        </div>

        <div style={{display: 'flex', padding: 20}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
              <span>Full Name:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>Andrew Ng’anga</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Nationality:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>Kenyan</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Sex:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>Male</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Date of Birth (Age):</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>18-09-1975 (45 Years)</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>National ID (NIN)/Passport No: :</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>CM989387837736ACG</span>
            </div>

          </div>
          <div style={{width: 100, height: 150, background: 'yellow', marginLeft: 'auto', float: 'right'}}>
          </div>
        </div>
      </div>


      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{
          width: '100%',
          background: '#d8dce0',
          height: 50,
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          paddingLeft: 20
        }}>
          Travel Information
        </div>

        <div style={{display: 'flex', padding: 20}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '60%'}}>
            <div>
              <span>Point of Entry:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>Busia POE</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Country of Departure:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>Kenya</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Country of Transit:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>Rwanda</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Date and Time of entry:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>15-04-2020  9:35AM</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Planned duration of stay (in Days) while in Uganda:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>3 days (In Transit)</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Physical address while in Uganda (Hotel/village/town/district):</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>Mbarara  (Victoria Hotel), In Transit</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Phone Contact or Next of Kin contact:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>+254839983763</span>
            </div>
          </div>
          <div style={{width: '40%', marginLeft: 'auto', marginRight: 100, display: 'flex', flexDirection: 'column'}}>
            <div>
              <span>Point of Entry ID</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>POE0000125</span>
            </div>

            <div style={{border: 'solid black 1px', paddingLeft: 10}}>
              <span>Countries visited in the last 14 days:</span>
              <div style={{paddingLeft: 5, fontWeight: 'bolder'}}>
                <p style={{padding: 0, margin: 0}}>Kenya</p>
                <p style={{padding: 0, margin: 0}}>Tanzania</p>
                <p style={{padding: 0, margin: 0}}>South Sudan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{
          width: '100%',
          background: '#d8dce0',
          height: 50,
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          paddingLeft: 20
        }}>
          Novel Coronavirus 2019 Investigations
        </div>
        <div style={{display: 'flex', padding: 20}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
              <span>Measured temperature:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>36.3 *C</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Isolated:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>No</span>
            </div>
            <div style={{marginTop: 5}}>
              <span>Referred for further investigation:</span>
              <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>No</span>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

export const TrackedEntityInstance = () => {
  const componentRef = useRef();
  return (
      <div>
        <Menu mode="horizontal">

          <Menu.Item key="print" >

            <ReactToPrint
                trigger={() => <li><PrinterOutlined /> Print this pass</li>}
                content={() => componentRef.current}
            />
          </Menu.Item>
          <Menu.Item key="group" >
            <EyeOutlined />
            View UAG837Q
          </Menu.Item>

          <Menu.Item key="home" >
            <HomeOutlined />
            Back to List
          </Menu.Item>
        </Menu>

        <Instance ref={componentRef}/>
      </div>
  );
}