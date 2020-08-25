import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import React from "react";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
    },
    section: {
        margin: 10,
        padding: 10,
        flex: 1,
        textAlign: 'center'
    },
});

// Create Document Component
const PDFAttachment = ({instance, verifier, nationality, c_of_resd}) => {
    const tei = instance;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={{alignContent: 'left', flexDirection: 'row'}} wrap={false}>
                        <View style={{alignContent: 'left', width: '20%'}}>
                            <Image src="rbc.png" style={{ width: 200, marginBottom: '5px', marginTop: 5}}/>
                        </View>
                        <View style={{alignContent: 'right', width: '80%'}} >
                            <Text style={{marginTop: 20, fontWeight: 400, textAlign:'right', color: 'green', fontSize: 12}}>Biomedical Services (BIOS) - National Reference Laboratory</Text>
                            <Text style={{marginTop: 5, fontWeight: 800, textAlign:'center', fontSize: 14, marginLeft: 70, fontWeight: 'bolder'}}>ACCREDITED ISO-15189:2012</Text>
                            <Text style={{ marginTop: 2, fontWeight: 'bold', textAlign:'center', fontSize: 12, marginLeft: 70}}>COVID-19 Result Report</Text>
                        </View>
                    </View>
                    <View style={{alignContent: 'left'}}>
                        <View style={{textAlign: 'left'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{
                                    width: '100%',
                                    backgroundColor: '#c6d3dc',
                                    color: '#FFFFFF',
                                    flex: 1,
                                    textAlign: 'left',
                                    alignContent: 'left',
                                    paddingLeft: 5,
                                    marginTop: 20,
                                    fontSize: 16
                                }}>
                                    <Text>Lab Contact Information</Text>
                                </View>
                                <View style={{alignContent: 'left', flexDirection: 'row'}} wrap={false}>
                                    <View style={{alignContent: 'left', width: '40%'}}>
                                        <Text style={{marginTop: 10, fontWeight: 'bold', textAlign:'left', fontSize: 10}}>Address: 
                                            <Text style={{marginTop: 10, fontWeight: 'bolder', fontSize: 10}}>PO BOX 4668 KIGALI-RWANDA</Text>
                                        </Text>
                                    </View>
                                    <View style={{alignContent: 'right', width: '30%'}} >
                                        <Text style={{marginTop: 10, textAlign:'left', fontSize: 10}}>Telephone: +(250) 781 415 724</Text>
                                    </View>
                                    <View style={{alignContent: 'left', width: '30%'}}>
                                        <Text style={{ marginTop: 10, fontWeight: 'bold', textAlign:'left', fontSize: 10}}>Email: covid19@rbc.gov.rw</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{
                                    width: '100%',
                                    backgroundColor: '#c6d3dc',
                                    color: '#FFFFFF',
                                    flex: 1,
                                    textAlign: 'left',
                                    alignContent: 'left',
                                    paddingLeft: 5,
                                    marginTop: 20,
                                    fontSize: 16
                                }}>
                                    <Text>Vital Case Information</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View >
                                    <View style={{marginTop: 10}}>
                                        <Text style={{paddingLeft: 5, fontWeight: 'bolder', fontSize: 12}}>Unique ID: {tei.he05i8FUwu3}</Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{paddingLeft: 5, fontWeight: 'bolder', fontSize: 12}}>Full Name: {tei.sB1IHYu2xQT + " " + tei.ENRjVGxVL6l} </Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{paddingLeft: 5, fontWeight: 'bolder',fontSize: 13}}>
                                            Sex: {tei.oindugucx72}
                                        </Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{paddingLeft: 5, fontWeight: 'bolder',fontSize: 13}}>Date of Birth: {tei.NI0QRzJvQ0k}</Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{paddingLeft: 5, fontWeight: 'bolder',fontSize: 13}}>
                                            Nationality: {nationality}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{marginLeft: 'auto', marginRight: 10}}>
                                    <View style={{marginLeft: "auto", marginRight: 30}}>
                                        <Image src={verifier} style={{ width: 128, height: 128, marginBottom: '5px', marginTop: 10, marginRight: 20}}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{textAlign: 'left'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{
                                    width: '100%',
                                    backgroundColor: '#c6d3dc',
                                    color: '#FFFFFF',
                                    flex: 1,
                                    textAlign: 'left',
                                    alignContent: 'left',
                                    paddingLeft: 5,
                                    marginTop: 20,
                                    fontSize: 16
                                }}>
                                    <Text>Address and Contact Information</Text>
                                </View>
                            </View>
                            <View style={{display: 'flex', padding: 5}}>
                                <View style={{flex: 1, width: '70%'}}>
                                    <View>
                                        <Text style={{fontWeight: 'bolder',fontSize: 13}}>Telephone: {tei.fctSQp5nAYl}</Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{ fontWeight: 'bolder',fontSize: 13}}>
                                            Email Address: {tei.YVZnRB53ymX}
                                        </Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{ fontWeight: 'bolder',fontSize: 13}}>
                                            Country of Residence: {c_of_resd}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{textAlign: 'left'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{
                                    width: '100%',
                                    backgroundColor: '#c6d3dc',
                                    color: '#FFFFFF',
                                    flex: 1,
                                    textAlign: 'left',
                                    alignContent: 'left',
                                    paddingLeft: 5,
                                    marginTop: 20,
                                    fontSize: 16
                                }}>
                                    <Text>COVID-19 Investigation and Tests</Text>
                                </View>
                                <View style={{flex: 1, padding: 5}}>
                                    <View style={{flex: 1, width: '100%'}}>
                                        <View>
                                            <Text style={{fontWeight: 'bolder',fontSize: 13}}>Date of Specimen Collection: {tei.iR8O4hSLHnu ? tei.iR8O4hSLHnu.Q98LhagGLFj : ""}</Text>
                                        </View>
                                        <View style={{
                                            marginTop: 5,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexBasis: '100%',
                                            width: '100%'
                                        }}>
                                            <Text style={{fontWeight: 'bolder',fontSize: 13}}>Date of Test Result: {tei.dDHkBd3X8Ce ? tei.dDHkBd3X8Ce.Cl2I1H6Y3oj : ""}  </Text>
                                        </View>
                                        <View style={{marginTop: 5}}>
                                            <Text style={{ fontWeight: 'bolder',fontSize: 13 }}>SARS-CoV-2 RT-PCR Result: {tei.dDHkBd3X8Ce ? tei.dDHkBd3X8Ce.ovY6E8BSdto : ""}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{textAlign: 'left'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{
                                    width: '100%',
                                    backgroundColor: '#c6d3dc',
                                    color: '#FFFFFF',
                                    flex: 1,
                                    textAlign: 'left',
                                    alignContent: 'left',
                                    paddingLeft: 5,
                                    marginTop: 20,
                                    fontSize: 16
                                }}>
                                    <Text>OFFICIAL USE ONLY</Text>
                                </View>
                                <View style={{alignContent: 'left', flexDirection: 'row'}} wrap={false}>
                                    <View style={{alignContent: 'left', width: '50%'}}>
                                        <Image src="rbc_stamp.png" style={{ width: 120, marginBottom: '5px', marginTop: 5}}/>
                                        <Text style={{marginTop: 5, fontWeight: 'bold', textAlign:'left', fontSize: 12, marginLeft: 50}}>Date: {tei.dDHkBd3X8Ce ? tei.dDHkBd3X8Ce.Cl2I1H6Y3oj : ""} </Text>
                                    </View>
                                    <View style={{alignContent: 'right', width: '50%'}} >
                                        <Image src="rbc_sign.png" style={{ width: 160, marginBottom: '5px', marginTop: 5}}/>
                                        <Text style={{marginTop: 5, fontWeight: 'bold', textAlign:'left', fontSize: 12}}>Validated by Dr. Emil Ivan MWIKARAGO</Text>
                                        <Text style={{ marginTop: 2, fontWeight: 'bold', textAlign:'left', fontSize: 12}}>Division Manager</Text>
                                        <Text style={{ marginTop: 2, fontWeight: 'bold', textAlign:'left', fontSize: 12}}>National Reference Laboratory</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}


export default PDFAttachment;
