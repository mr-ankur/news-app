import React, { Component } from "react";
import axios from "axios";
import Story from "./Story";
import { Row, Col } from "react-grid";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Loader from "react-loader-spinner";

export default class NewsHome extends Component {
  state = {
    stories: [],
    storyType: "top",
  };
  componentDidMount() {
    var data = [];
    axios
      .get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
      .then((res) => {
        let ids = res.data.slice(0, 30);
        ids.map((x) => {
          axios
            .get(
              "https://hacker-news.firebaseio.com/v0/item/" +
                x +
                ".json?print=pretty"
            )
            .then((r) => {
              data.push(r.data);
              this.setState({ stories: data });
            });
        });
      });
  }
  getStories(storyType) {
    var data = [];
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/` +
          storyType +
          `stories.json?print=pretty`
      )
      .then((res) => {
        let ids = res.data.slice(0, 30);
        ids.map((x) => {
          axios
            .get(
              "https://hacker-news.firebaseio.com/v0/item/" +
                x +
                ".json?print=pretty"
            )
            .then((r) => {
              data.push(r.data);
              this.setState({ stories: data });
            });
        });
      });
  }
  render() {
    const stories = this.state.stories.slice(0, 30);
    return (
      <div>
        <h1>Hackker News</h1>
        <Row style={{ marginBottom: "1rem" }}>
          <Col xs={4}></Col>
          <Col xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                name="story_type"
                row
                value={this.state.storyType}
                onChange={(e) => {
                  this.getStories(e.target.value);
                  this.setState({ storyType: e.target.value });
                }}
              >
                <FormControlLabel value="top" control={<Radio />} label="top" />
                <FormControlLabel value="ask" control={<Radio />} label="ask" />
                <FormControlLabel
                  value="show"
                  control={<Radio />}
                  label="show"
                />
                <FormControlLabel
                  value="job"
                  control={<Radio />}
                  label="jobs"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <div>
            {stories &&
              stories.length >= 30 &&
              stories.map((x, i) => (
                <Story story={x} key={x.id} index={i + 1} />
              ))}
            {stories && stories.length !== 30 && (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={10000} //3 secs
              />
            )}
          </div>
        </Row>
      </div>
    );
  }
}
