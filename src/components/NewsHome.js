import React, { Component } from 'react'
import axios from 'axios'
import Story from './Story'

export default class NewsHome extends Component {
  state = {
    storyIds: null,
  };
  componentDidMount() {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
      .then((res) => {
        this.setState({ storyIds: res.data });
      });
  }
  render() {
    const ids = this.state.storyIds && this.state.storyIds.splice(0,30)
    return (
      <div>
        <h1>Hacker News</h1>
        {ids && ids.length > 0 && ids.map((x,i) => <Story id={x} key={x} index={i+1} /> )}
      </div>
    );
  }
}
