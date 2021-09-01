import React, {useEffect} from 'react';
import {Card, Icon, Avartar, Col, Typography, Row} from 'antd';

const {Title} = Typography
const {Meta} = Card

function LandingPage() {


    // const renderCards = Videos.map((video, index) => {

    // })
    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr />
            <Row gutter={[32,16]}>
                <Col lg={6} md={8} xs={24}>
                    <div style={{position:'relative'}}>
                        <div className=" duration">

                        </div>
                    </div>
                    <br />
                    <Meta description="" />
                </Col>
            </Row>


        </div>
    )
}

export default LandingPage
