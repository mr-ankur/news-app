import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Container } from "react-grid";
import DataLabel from './DataLabel'

export default class UserProfile extends Component {
  state = {
    userData: null,
  };
  componentDidMount() {
    axios
      .get(
        "https://hacker-news.firebaseio.com/v0" +
          window.location.pathname +
          ".json?print=pretty"
      )
      .then((res) => {
        this.setState({ userData: res.data });
      });
  }
  render() {
    const profileData = this.state.userData;
    const created = profileData && moment(new Date(profileData.created * 1000));
    return (
      <Container>
        <h1>User Profile</h1>
        {profileData && (
          <div style={{ background: "#dedede", padding: "30px" }}>
            <DataLabel text1={"User"} text2={profileData.id} />
            <DataLabel
              text1={"Created"}
              text2={created.format("dddd, MMMM Do YYYY, h:mm:ss a")}
            />
            <DataLabel
              text1={"Karma"}
              text2={profileData.karma}
            />
            <DataLabel text1={"About"} text2={profileData.about} />
          </div>
        )}
      </Container>
    );
  }
}
