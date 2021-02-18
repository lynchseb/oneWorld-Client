
// Dependency Imports
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Sidebar from "react-sidebar";

// Model Test
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

//Sidebar Component Imports
import MaterialTitlePanel from "./MaterialTitlePanel";
import SidebarContent from "./SidebarContent";

//Youtube API components
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

// Enabling HRM
import { hot } from "react-hot-loader/root";

// Resium imports
import { Viewer, Entity, PointGraphics, EntityDescription, CustomDataSource } from "resium";
import { Cartesian3, createWorldTerrain, Color } from "cesium";

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';

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
    name: "Toronto",
    position: Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100),
  
    key: 1
     
  },
  {
    name: "Tokyo",
    position: Cartesian3.fromDegrees(43.6532, 79.3832, 100),
    
    key: 2
  }
]


const termFromSearchBar = "?part=snippet&maxResults=5&key=AIzaSyCuPWQiKkYwa8pbCPmdmCJJVm53jMAsQ0A&q=hockey"
  
const test = function MyVerticallyCenteredModal(props) {
  return (
    <Modal
   
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default hot(function Application(props) {

  const [state, setState] = useState({
    docked: false,
    open: false,
    transitions: true,
    videos: [],
    selectedVideos: null

  })

  //Sidebar methods begin

  const onSetOpen = (open) => {
    setState(prev => ({...prev, open}))
  }

  const menuButtonClick = (ev) => {
    ev.preventDefault();
    onSetOpen(!state.open);
  }

  const renderPropCheckbox = (prop) => {
    const toggleMethod = ev => {
      const newState = {...state};
      newState.docked = ev.target.checked
      setState(prev => ({...prev, ...newState}));
    };

    return (
      <p key={prop}>
        <label htmlFor={prop}>
          <input
            type="checkbox"
            onChange={toggleMethod}
            checked={state.docked}
            id={prop}
          />
          {prop}
        </label>
      </p>
    );
  }

  // Sidebar methods end

 

  // Youtube API methods begin
  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get('/search', {
        params: {
            q: termFromSearchBar
        }
    })
    setState(prev => ({...prev,  videos: response.data.items}))
       
    
};
    const handleVideoSelect = (video) => {
    setState(prev => ({...prev, selectedVideo: video}))
}

  // YouTube API methods end

  // Entity Builder Begin
 
  const userPreferences = getUserPreferences.map((entity) => {
    return ( 
      <Entity key={entity.key} position={entity.position} name={entity.name} description={"Hello World"} point={{ pixelSize: 15, color: Color.BLUE }}>
        <EntityDescription resizeInfoBox={true}>
          <div className='ui container' style={{marginTop: '1em'}}>
            <SearchBar handleFormSubmit={handleSubmit}/>
            <div className='ui grid'>
              <div className="ui row">
                <div className="five wide column">
                  <VideoList handleVideoSelect={handleVideoSelect} videos={state.videos}/>
                </div>
              </div>
            </div>
          </div>
        </EntityDescription>
      </Entity> 
    )
  })

  //Entity Builder end

  const sidebar = <SidebarContent />;

  const contentHeader = (
    <span className='span-head'>
      
        <a onClick={menuButtonClick} href="#" style={styles.contentHeaderMenuLink}>
          =
        </a> oneWorld
      {renderPropCheckbox()}
      
    </span>
  );

  const sidebarProps = {
    sidebar,
    docked: state.docked,
    sidebarClassName: "custom-sidebar-class",
    // contentId: "custom-sidebar-content-id",
    open: state.open,
    onSetOpen
  };

    return (
      <main>
       
        <nav>
            <Sidebar {...sidebarProps}>
              <MaterialTitlePanel title={contentHeader}>
                <div style={styles.content}>
                  <Viewer infobox={true} fullscreenButton={true} terrainProvider={terrainProvider} onClick={(e, entity) => console.log(entity)}>
                    <CustomDataSource>
                    { userPreferences }

                    </CustomDataSource>
                  </Viewer>
                </div>
              </MaterialTitlePanel>
            </Sidebar>
        </nav>
      <footer>
      <div className="eleven wide column">
                    <VideoDetail video={state.selectedVideo}/>
                </div> 
      
      </footer>
      </main>
    );
  }
)

/* <main>
<nav>
    <Sidebar {...sidebarProps}>
      
    </Sidebar>
</nav>
        <MaterialTitlePanel title={contentHeader}>
        <div style={styles.content}>
        <Viewer terrainProvider={terrainProvider}>
                  {this.userPreferences}
                </Viewer>
        </div>
      </MaterialTitlePanel>
</main> */

// export default hot(Application)

// ReactDOM.render(<Application />, document.getElementById("root"));



