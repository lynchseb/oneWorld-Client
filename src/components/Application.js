
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
    description: "North America",
    key: 1
     
  },
  {
    name: "Tokyo",
    position: Cartesian3.fromDegrees(43.6532, 79.3832, 100),
    description: "Asian",
    key: 2
  }
]

// search?key={your_key_here}&channelId={channel_id_here}&part=snippet,id&order=date&maxResults=20
// const termFromSearchBar = "?part=snippet&maxResults=5&key=AIzaSyCuPWQiKkYwa8pbCPmdmCJJVm53jMAsQ0A&q=hockey"
  


export default hot(function Application(props) {
  
  const [state, setState] = useState({
    docked: false,
    open: false,
    transitions: true,
    videos: [],
    selectedVideos: null,
    modalShow: false,
    videoModalShow: false

  });

  // Youtube API requests Begin
  
  // useEffect(() => {
  //   handleSubmit()
  // })

  // Youtube API requests End

  // Playlist and Video Modal methods begin

  function PlaylistModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            oneWorld
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='ui container' style={{marginBottom: '1em'}}>
            <SearchBar handleFormSubmit={handleSubmit}/>
            <div className='ui grid'>
              <div className="ui row">
                 <div className="five wide column">
                   <VideoList handleVideoSelect={handleVideoSelect} videos={state.videos}/>
                  </div>
                </div>
            </div>
          </div>    
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function VideoModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body>
           <div className="eleven wide column">
               <VideoDetail video={state.selectedVideo}/>
            </div>    
        </Modal.Body>
      </Modal>
    );
  }


  const handleModalShow = () =>  {
    const newState = {...state}
    newState.modalShow = !state.modalShow
    setState(prev => ({...prev, ...newState}))

    //Likely need to put in handleSearch here
  }

  const handleVideoModalShow = () =>  {
    const newState = {...state}
    newState.videoModalShow = !state.videoModalShow
    setState(prev => ({...prev, ...newState}))
  }

  // Playlist and Video Modal methods end

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
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY]'
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
    handleModalShow()
    handleVideoModalShow()
    setState(prev => ({...prev, selectedVideo: video}))
  }

  // YouTube API methods end

  // Entity Builder Begin
   
  const userPreferences = getUserPreferences.map((entity) => {
    return ( 
      <Entity onClick={() => handleModalShow()} key={entity.key} position={entity.position} name={entity.name} description={entity.description} point={{ pixelSize: 15, color: Color.ORANGE }} >
        <PlaylistModal
        show={state.modalShow} 
        onHide={handleModalShow}
      />
      <VideoModal
        show={state.videoModalShow} 
        onHide={handleVideoModalShow}
      />
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
    contentId: "custom-sidebar-content-id",
    open: state.open,
    onSetOpen
  };

    return (
      <main>
       
        <nav>
            <Sidebar {...sidebarProps}>
              <MaterialTitlePanel title={contentHeader}>
                <div style={styles.content}>
                  <Viewer infobox={true} fullscreenButton={true} terrainProvider={terrainProvider}>
                    <CustomDataSource >
                    { userPreferences }
           
                    </CustomDataSource>
                  </Viewer>
                </div>
              </MaterialTitlePanel>
            </Sidebar>
        </nav>
      <footer>
                  {/* <div className="eleven wide column">
                    <VideoDetail video={state.selectedVideo}/>
                </div>  */}
      
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



