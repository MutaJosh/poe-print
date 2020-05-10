import React, {useRef, useState, useEffect, Component} from 'react';
import ReactToPrint from 'react-to-print';

class CaseInvestigation extends Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => <a href="#">Print this out!</a>}
                    content={() => this.componentRef}
                />
                <ComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
        );
    }
}
