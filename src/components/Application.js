
// Dependency Imports
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "./MaterialTitlePanel";
import SidebarContent from "./SidebarContent";

// import MaterialTitlePanel from "./material_title_panel";
// import SidebarContent from "./sidebar_content";

// Enabling HRM
import { hot } from "react-hot-loader/root";

// Resium imports
import { Viewer, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3, createWorldTerrain } from "cesium";

// Default Sidebar Styles
const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};

const terrainProvider = createWorldTerrain();
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      shadow: true,
    };

    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }

  //Sidebar methods begin
  onSetOpen(open) {
    this.setState({ open });
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  renderPropCheckbox(prop) {
    const toggleMethod = ev => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <label htmlFor={prop}>
          <input
            type="checkbox"
            onChange={toggleMethod}
            checked={this.state[prop]}
            id={prop}
          />
          {prop}
        </label>
      </p>
    );
  }
  // Sidebar methods end

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked && (
          <a onClick={this.menuButtonClick} href="#" style={styles.contentHeaderMenuLink}>
            =
          </a>
        )}
        <span>oneWorld {["docked"].map(this.renderPropCheckbox)}</span>
        
      </span>
    );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName: "custom-sidebar-class",
      // contentId: "custom-sidebar-content-id",
      open: this.state.open,
      onSetOpen: this.onSetOpen
    };

    return (
      <main>
          <Sidebar {...sidebarProps}>
            <MaterialTitlePanel title={contentHeader}>
              <div style={styles.content}>
                <Viewer terrainProvider={terrainProvider}>
                  <Entity position={position} name="Tokyo">
                    <PointGraphics pixelSize={15} />
                    <EntityDescription>
                      <h1>HELLO WORLdD</h1>
                    </EntityDescription>
                  </Entity>
                </Viewer>
              </div>
            </MaterialTitlePanel>
          </Sidebar>
      </main>
      
    
    );
  }
}

export default hot(Application)

ReactDOM.render(<Application />, document.getElementById("root"));



