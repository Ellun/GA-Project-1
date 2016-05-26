import $ from 'jquery';
import React, {Component} from 'react';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      up : false,
      down : false,
      left : false,
      right : false,
      shoot : false
    }

    $(document).on('keydown', (event) => {
      event.preventDefault();
      switch (event.keyCode) {
        case 87:
          this.setState({up : true});
          this.move();
          break;
        case 83:
          this.setState({down : true});
          this.move();
          break;
        case 65:
          this.setState({left : true});
          this.move();
          break;
        case 68:
          this.setState({right : true});
          this.move();
          break;
        case 13:
          this.setState({shoot : true});
          this.move();
          break;
      }
    })

    $(document).on('keyup', (event) => {
      event.preventDefault();
      switch (event.keyCode) {
        case 87:
          this.setState({up : false});
          break;
        case 83:
          this.setState({down : false});
          break;
        case 65:
          this.setState({left : false});
          break;
        case 68:
          this.setState({right : false});
          break;
        case 13:
          this.setState({shoot : false});
          break;
      }
    })
  }

  render() {
    return (
      <div id={this.props.player}>
      </div>
    )
  }

  move() {
    if (this.state.up) {
      console.log(this.state.up);
      $(`#${this.props.player}`).animate({'top':'-=4px'},0);
    }
    if (this.state.down) {
      $(`#${this.props.player}`).animate({'top':'+=4px'},0);
    }
    if (this.state.left) {
      $(`#${this.props.player}`).animate({'left':'-=10px'},0);
    }
    if (this.state.right) {
      $(`#${this.props.player}`).animate({'left':'+=10px'},0);
    }
  }
}
