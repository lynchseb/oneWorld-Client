
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
    padding: "0px",
    margin: "0px"
  }
};

const terrainProvider = createWorldTerrain();

const getUserPreferences = [
  {
    name: "Tokyo",
    position: Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100),
    content: "test"
  },
  {
    name: "Toronto",
    position: Cartesian3.fromDegrees(43.6532, 79.3832, 100),
    content: "test"
  },
  {
    name: "Bolivia",
    position: Cartesian3.fromDegrees(-100.0707383, 133.7117244, 100),
    content: "test"
  },
  {
    name: "Peru",
    position:  Cartesian3.fromDegrees(145.0707383, 165.7117244, 100),
    content: "test"
  },
  {
    name: "Bangkok",
    position: Cartesian3.fromDegrees(23.0707383, 78.7117244, 100),
    content: "test"
  }
]
  
  // Cartesian3.fromDegrees(15.0707383, 30.7117244, 100),
  // Cartesian3.fromDegrees(42.0707383, 55.7117244, 100),
  // Cartesian3.fromDegrees(77.0707383, -145.7117244, 100)


class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: true,
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

 
  userPreferences = getUserPreferences.map((entity) => {
    return ( 
    <Entity position={entity.position} name={entity.name}>
      <PointGraphics pixelSize={15} />
      <EntityDescription>
        <h1>{entity.content}</h1>
      </EntityDescription>
    </Entity> 
    )
  })

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
                  {this.userPreferences}
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



