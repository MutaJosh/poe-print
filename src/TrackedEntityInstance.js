import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import {Link} from 'react-router-dom'
import { Menu} from "antd";
import QrCode from 'qrcode.react';
import { useConfig } from '@dhis2/app-runtime'


import {
  PrinterOutlined, EyeOutlined, HomeOutlined
} from '@ant-design/icons';
import {observer} from "mobx-react";
import {useStore} from "./context/context";

const InstanceData = observer(() => {
  const store = useStore();
  const { baseUrl, apiVersion } = useConfig();

  const imageUrl = `${baseUrl}/api/trackedEntityInstances/${store.currentInstance.instance}/AsnwhQvSeMy/image`;

  return (<div style={{padding: 20, display: 'flex', flexDirection: 'column', fontSize: 'large'}}>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <QrCode value="OivI21UUUhG" style={{marginBottom: 20, width: 64, height: 64}} renderAs="svg"/>
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
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.sB1IHYu2xQT}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Nationality:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.XvETY1aTxuB}</span>
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
        <div style={{width: 200, height: 200, background: 'yellow', overflow:'hidden', marginLeft: 'auto', float: 'right'}}>
          <img src={imageUrl} alt="Image"/>
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
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}></span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Country of Departure:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.cW0UPEANS5t}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Country of Transit:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.pxcXhmjJeMv}</span>
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
        <div style={{width: '40%', marginLeft: 'auto', marginRight: 100, display: 'flex', flexDirection: 'column'}}>
          <div>
            <span>Point of Entry ID:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.CLzIR1Ye97b}</span>
          </div>

          <div style={{border: 'solid black 1px', paddingLeft: 10}}>
            <span>Countries visited in the last 14 days:</span>
            <div style={{paddingLeft: 5, fontWeight: 'bolder'}}>
              <p style={{padding: 0, margin: 0}}>{store.currentInstance.wJpIzoGlb9j}</p>
              <p style={{padding: 0, margin: 0}}>{store.currentInstance.zhWTXIwd6U1}</p>
              <p style={{padding: 0, margin: 0}}>{store.currentInstance.x9YWFwwuQnG}</p>
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
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.QUrkIanwcHD}&#8451;</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Isolated:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.Ep6evsVocKY}</span>
          </div>
          <div style={{marginTop: 5}}>
            <span>Referred for further investigation:</span>
            <span style={{paddingLeft: 5, fontWeight: 'bolder'}}>{store.currentInstance.EZwIFcKvSes}</span>
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
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="print">
          <ReactToPrint
            trigger={() => <span><PrinterOutlined/> Print this pass</span>}
            content={() => componentRef.current}
          />
        </Menu.Item>
        <Menu.Item key="group">
          <EyeOutlined/>
          View UAG837Q
        </Menu.Item>

        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined/>
            Back to List
          </Link>
        </Menu.Item>
      </Menu>

      <Instance ref={componentRef}/>
    </div>
  );
}
