import React, { Component } from 'react'
import { Row, Col } from "react-grid";

export default class DataLabel extends Component {
    render() {
        return (
          <div>
            <Row style={{ marginTop: "1rem" }}>
              <Col xs={2}>
                <span style={{ fontWeight: "600" }}>{this.props.text1}</span>
              </Col>
              <Col xs={10}>
                <span style={{ float: "Left" }}>{this.props.text2}</span>
              </Col>
            </Row>
          </div>
        );
    }
}
