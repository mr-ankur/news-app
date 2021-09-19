import React, { Component } from "react";
import psl from "psl";
import { Container, Row, Col } from "react-grid";
import { Link } from "react-router-dom";

export default class Story extends Component {
  state = {
    storyData: null,
  };
  extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }

    //find & remove port number
    hostname = hostname.split(":")[0];
    //find & remove "?"
    hostname = hostname.split("?")[0];

    return hostname;
  }
  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  render() {
    const storyData = this.props.story;
    return (
      <Container>
        {storyData && (
          <div style={{ marginTop: "0.5rem" }}>
            <Row style={{ background: "#dedede", padding: "10px 0px 10px 0" }}>
              <Col xs={1} style={{ margin: 'auto'}}>{this.props.index}.</Col>
              <Col xs={11}>
                <Row
                  onClick={() =>
                    storyData.url ? window.open(storyData.url, "_blank") : ""
                  }
                >
                  <Col xs={9} style={{ textAlign: 'left'}}><strong>{storyData.title}</strong></Col>
                  <Col xs={3} style={{ textAlign: 'left'}}>
                    {storyData.url &&
                      <Link to={storyData.url} target="_blank" rel="noopener noreferrer">
                        storyData.url
                      </Link>
                    }
                  </Col>
                </Row>
                <Row style={{ marginTop: "0.5rem", textAlign: 'left' }}>
                  <Col xs={9}>{`${storyData.score} points | by ${storyData.by} | ${this.timeSince(new Date(storyData.time * 1000))} ago | ${storyData.descendants} comments`}</Col>
                  <Col xs={3}>
                    <Link to={"/user/" + storyData.by}>
                      {"by " + storyData.by}
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    );
  }
}
