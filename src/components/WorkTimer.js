import React from 'react';

class WorkTimer extends React.Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { seconds } = this.state;
    return <p>{`Đã xem: ${seconds} giây`}</p>;
  }
}

export default WorkTimer;
