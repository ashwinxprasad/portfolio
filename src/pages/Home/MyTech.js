import React, { Component } from 'react';
import '../../styles/pages/home/my-tech.css';
import vis from 'vis';
import $ from 'jquery';

export default class MyTech extends Component {
  constructor(options) {
    super(options);
  }
  componentDidMount() {
    // Anim on scroll
    var els = $('.MyTech');
    this.scrollableElements = [];
    for (var i = 0; i < els.length; i++) {
      var el = els.eq(i);

      this.scrollableElements.push({
        el: el,
        y: el.offset().top + el.height() * 0.5
      });
    }

    if (this.shouldShowVisNetwork()) {
      // Create the vis network
      this.createVisNetwork();
    }

    $(window).on(
      'resize',
      function() {
        if (this.shouldShowVisNetwork()) {
          // Create the vis network
          this.createVisNetwork();
        }
      }.bind(this)
    );
  }
  componentWillReceiveProps(newProps) {
    this.checkScroll(newProps.scrollY);
  }
  checkScroll(scrollY) {
    for (var i = 0; i < this.scrollableElements.length; i++) {
      var scrollable = this.scrollableElements[i];
      if (scrollY + window.innerHeight * 0.66 >= scrollable.y) {
        scrollable.el.addClass('anim');
      }
    }
  }

  // Resize the vis netwrok
  resizeNetwork() {
    if (window.innerWidth < 1000) {
      this.network.moveNode(
        1,
        window.innerWidth * 0.05,
        $('.vis-container').height() * 0.4
      );
    } else {
      this.network.moveNode(1, window.innerWidth * 0.7, null);

      this.network.moveTo({
        position: { x: 0, y: 0 },
        scale: 0.45
      });
    }
  }

  render() {
    return (
      <div className="MyTech">
        <div className="content">
          {/* The Text */}
          <div className="text-container" style={{backgroundColor: 'white'}}>
            <div className="title" style={{color: "#8d61f4"}} >My Proficiencies</div>
            <div className="sub-text" style={{color: '#8D61F4'}}>
              I am constantly learning and improving my skills with a multitude
              of technologies, languages, and libraries. From html to
              flutter, the ones shown here I have become expertly capable with.
              <br />
              <br />
              I'm proficient in Web Technologies. However 
              Mobile Application Development is where my true passion lies. 
              I'm constantly exploring new horizons, while trying to perfect what I learn.
              <br />
              <br />
              On the back end, I consider myself professionally capable with all
              of the technologies listed. Also, I enjoy dev ops, managing processes and
              being a part of agile teams.
            </div>
          </div>

          {/* Alternative list of tech */}
          {/* (Only shown on TOUCH devices) */}

          {true ? (
            <div className="content">
            <div className="tech-list-container" style={{backgroundColor: 'white'}}>
                <div className="tech-list">
                <div className="title">Front End</div>
                <div className="item">Flutter</div>
                <div className="item">Android</div>
                <div className="item">React</div>
                <div className="item">React Native</div>
                <div className="item">HTML</div>
                <div className="item">CSS</div>
                <div className="item">Javascript</div>
              </div>
              <div className="tech-list">
                <div className="title">Others</div>
                <div className="item">ExpressJS</div>
                <div className="item">Socket.io</div>
                <div className="item">Google Firebase</div>
                <div className="item">PHP</div>
                <div className="item">Python</div>
                <div className="item">Keras</div>
                <div className="item">Golang</div>
              </div>
            </div>
            </div>
          ) : null}

          {/* Instructions for the Vis network */}
          {/* (Only show on non-touch devices, or if the screen size is smaller than 1000) */}
          {false ? (
            <div className="instructions">(Click and drag)</div>
          ) : null}
        </div>

        {/* The Container for the Vis Network */}
        {/* (Only show on non-touch devices, or if the screen size is smaller than 1000) */}
        <div
          className={
            'vis-container' + (false? '' : ' hidden')
          }
        />
      </div>
    );
  }

  // Check if the vis network should be displayed
  shouldShowVisNetwork() {
    if (window.innerWidth > 1000 && !this.props.isTouchDevice) {
      return true;
    } else {
      return false;
    }
  }

  // Creating the vis network
  createVisNetwork() {
    var nodes = new vis.DataSet([
      /* Web Dev */
      {
        id: 1,
        label: 'Web Development',
        physics: false,
        x: 500
      },
      /* Front End */
      { id: 2, label: 'Front End' },
      { id: 3, label: 'Javascript' },
      { id: 4, label: 'jQuery' },
      { id: 5, label: 'ThreeJS' },
      { id: 6, label: 'HTML' },
      { id: 7, label: 'CSS' },
      { id: 8, label: 'SASS' },
      { id: 9, label: 'ReactJS' },
      /* Back End */
      { id: 11, label: 'Paypal' },
      { id: 12, label: 'NodeJS' },
      { id: 13, label: 'ExpressJS' },
      { id: 15, label: 'Google Firebase' },

      /* Web Design 
      { id: 16, label: 'Web Design' },
      { id: 17, label: 'Adobe Photoshop' },
      { id: 18, label: 'Adobe Illustrator' },
      */

      /* Afterthoughts */
      { id: 19, label: 'PHP' },
      { id: 10, label: 'Wordpress' },
      { id: 20, label: 'Back End' },
      { id: 21, label: 'React Native' }
    ]);

    var edges = new vis.DataSet([
      /* Front End */
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 3, to: 5 },
      { from: 3, to: 9 },
      { from: 2, to: 6 },
      { from: 2, to: 7 },
      { from: 7, to: 8 },
      { from: 2, to: 21 },

      /* Back End */
      { from: 1, to: 20 },
      { from: 20, to: 11 },
      { from: 20, to: 12 },
      { from: 20, to: 13 },
      { from: 20, to: 15 },
      { from: 20, to: 19 },
      { from: 19, to: 10 }

      /* Web Design
      { from: 16, to: 17 },
      { from: 16, to: 18 }
      */
    ]);

    var data = {
      nodes: nodes,
      edges: edges
    };

    var width = $('.vis-container').width();
    var height = $('.vis-container').height();
    var options = {
      width: width + 'px',
      height: height + 'px',
      autoResize: true,
      edges: {
        color: { color: 'white', highlight: 'white' },
        width: 5
      },
      nodes: {
        borderWidth: 4,
        chosen: false,
        margin: 13,
        shape: 'circle',
        font: {
          color: 'white',
          size: 24,
          face: 'Arial'
        },
        color: {
          border: '#d6614d',
          background: '#f47761'
        },
        shadow: { enabled: true }
      },
      interaction: {
        dragView: false,
        hover: false,
        selectConnectedEdges: false,
        zoomView: false
      },
      physics: {
        barnesHut: {
          springLength: 300,
          springConstant: 0.1,
          centralGravity: 0
        },
        stabilization: false,
        minVelocity: 0
      },
      layout: {
        randomSeed: 12129030198236,
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          levelSeparation: 150,
          direction: 'UD', // UD, DU, LR, RL
          sortMethod: 'hubsize' // hubsize, directed
        }
      }
    };

    var container = $('.vis-container')[0];

    var network = new vis.Network(container, data, options);
    this.network = network;
    $(window).on(
      'resize',
      function() {
        this.network.canvas.setSize(
          window.innerWidth,
          $('.vis-container').height()
        );
        this.resizeNetwork();
      }.bind(this)
    );

    this.resizeNetwork();

    // Scaling the network
    network.once(
      'afterDrawing',
      function() {
        if (window.innerWidth > 800) {
          this.network.moveTo({
            position: { x: 0, y: 0 },
            scale: 0.45
          });
        } else {
          this.network.moveTo({
            position: { x: 0, y: 0 },
            scale: 0.35
          });
        }
      }.bind(this)
    );

    // Resizing the network
    window.onresize = function() {
      network.fit();
      network.moveTo({
        position: { x: 0, y: 0 },
        scale: 0.45
      });
    };
  }
}
