import React, { Component } from 'react';
import ribbon from '../assets/images/ribbon-3.png';
import '../styles/components/project.css';
import $ from 'jquery';

class Project extends Component {
  constructor(options) {
    super(options);
    this.state = {
      images: []
    };
  }
  componentDidMount() {
    // Load the images
    this.loadImages();

    // Inject the description markup
    this.injectDescription();
  }

  render() {
    return (
      <div className="Project anim-on-scroll">
        {/* The Text */}
        <div className="text-container">
          <div className="name">
            <img className="ribbon" src={ribbon} alt="" />
            <div className="text">{this.props.name}</div>
          </div>
          <div className="description" />
          <a className="link" href={this.props.link} target="_blank">
            {this.props.link}
          </a>
        </div>
        <div className="line" />

        {/* The Images */}
        <div className="image-container">
          <a href={this.props.link} target="_blank">
            <img src={this.state.images[0]} alt={this.props.name} />
          </a>
        </div>
      </div>
    );
  }

  /* ** Private Functions ** */
  loadImages() {
    var images = [];

    // Loop through all paths that have been
    // passed down
    for (var i = 0; i < this.props.images.length; i++) {
      var path = this.props.images[i];

      images.push(require('../assets/images/projects' + path));
    }

    // Store them in the state.
    this.setState({
      images: images
    });
  }

  // Inject the description markup into the dom
  injectDescription() {
    $(`.Project:eq(${this.props.index}) .description`).html(
      this.props.description
    );
  }
}

export default Project;
