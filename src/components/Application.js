
// Dependency Imports
import React, { useState } from 'react';
// import ReactDOM from "react-dom";
import Sidebar from "react-sidebar";

// Modal Component Imports
import Modal from 'react-bootstrap/Modal';
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
import { Cartesian3, createWorldTerrain, Color, ClockRange, ClockStep, JulianDate } from "cesium";
import { Viewer, Entity, CustomDataSource, Globe, Clock } from "resium";

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



// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=21.5922529%2C-158.1147114&locationRadius=10mi&q=surfing&type=video&key=[YOUR_API_KEY]' \

const getUserPreferences = [

  {
    name: "Toronto",
    position: Cartesian3.fromDegrees(-79.347015, 43.651070, 100),
    description: "North America",
    location: "-79.347015%2C43.651070",
    key: 1
     
  },

  {
    name: "Tokyo",
    position: Cartesian3.fromDegrees(139.767052, 35.681167, 100),
    description: "Asia",
    location: "139.767052%2C35.681167",
    key: 2
  },
  {
    name: "San Francisco",
    position: Cartesian3.fromDegrees(-122.4194, 37.7749, 100),
    description: "North America",
    location: "-122.4194, 37.7749",
    key: 3
     
  },
  {
    name: "Berlin",
    position: Cartesian3.fromDegrees(13.4050, 52.5200, 100),
    description: "Europe",
    location: "13.4050, 52.5200",
    key: 4
     
  },
  {
    name: "Delhi",
    position: Cartesian3.fromDegrees(77.1025, 28.7041, 100),
    description: "Asia",
    location: "77.1025, 28.7041",
    key: 5
     
  },
  {
    name: "Sydney",
    position: Cartesian3.fromDegrees(151.2093, -33.8688, 100),
    description: "Australia",
    location: "151.2093, -33.8688",
    key: 6
     
  },
  
  {
    name: "Panama",
    position: Cartesian3.fromDegrees(-79.516670, 8.983333, 100),
    description: "Central America",
    location: "8.983333, -79.516670",
    key: 6
     
  },
  {
    name: "Rio de Janeiro",
    position: Cartesian3.fromDegrees(-43.196388, -22.908333, 100),
    description: "South America",
    location: "-43.196388, -22.908333",
    key: 6
     
  },
  {
    name: "Sydney",
    position: Cartesian3.fromDegrees(151.2093, -33.8688, 100),
    description: "Australia",
    location: "151.2093, -33.8688",
    key: 6
     
  },
  {
    name: "Sydney",
    position: Cartesian3.fromDegrees(151.2093, -33.8688, 100),
    description: "Australia",
    location: "151.2093, -33.8688",
    key: 6
     
  },
  {
    name: "Sydney",
    position: Cartesian3.fromDegrees(151.2093, -33.8688, 100),
    description: "Australia",
    location: "151.2093, -33.8688",
    key: 6
     
  },
  {
    name: "Sydney",
    position: Cartesian3.fromDegrees(151.2093, -33.8688, 100),
    description: "Australia",
    location: "151.2093, -33.8688",
    key: 6
     
  },
]
  
export default hot(function Application() {
  
  const [state, setState] = useState({
    docked: false,
    open: false,
    transitions: true,
    videos: [],
    selectedVideos: null,
    modalShow: false,
    videoModalShow: false,
    q: "Politics"

  });

  const handleQ = (arg) => {
    const newState = {...state}
    newState.q = arg
    setState(prev => ({...prev, ...newState}))
    console.log(`I worked! and here is my button ${arg} and this is my q state ${state.q}`)
  }

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
        centered={true}
       
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


  const handleModalShow = (entity) =>  {
    
    const newState = {...state}
    newState.modalShow = !state.modalShow
    setState(prev => ({...prev, ...newState}))
    console.log(entity.location)
    fetchVideos(entity.location)
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
  // 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=21.5922529%2C-158.1147114&locationRadius=100mi&maxResults=5&q=surfing&type=video&key=[YOUR_API_KEY]' 


  // Sidebar methods end
  
  // Youtube API methods begin
 

  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get('/search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          key: "",
          q: termFromSearchBar
        }
    })
    setState(prev => ({...prev,  videos: response.data.items})) 
  };

  const fetchVideos = async (location) => {
    const q = state.q
    const response = await youtube.get('/search', {
        params: {
          part: 'snippet',
          location,
          locationRadius: "150mi",
          maxResult: 5,
          q,
          type: "video",
          key: ""
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
      <Entity 
        onClick={() => handleModalShow(entity)} 
        key={entity.key} 
        position={entity.position} 
        name={entity.name} 
        description={entity.description} 
        api={entity.api}
        point={{ pixelSize: 15, color: Color.ORANGE }} >
      </Entity>
    )
  }) 

  //Entity Builder end

  const sidebar = <SidebarContent handleQ={handleQ}/>;

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
    onSetOpen,
  
  };



    return (
      <div>
       
        <main>
            <Sidebar {...sidebarProps}>
              <MaterialTitlePanel title={contentHeader}>
                <div style={styles.content}>
                  <Viewer infobox={true} fullscreenButton={true} terrainProvider={terrainProvider} >
                  <Globe enableLighting />
                  <Clock
                      startTime={JulianDate.fromIso8601("2020-02-20")}
                      currentTime={JulianDate.fromIso8601("2021-02-20")}
                      stopTime={JulianDate.fromIso8601("2030-01-01")}
                      clockRange={ClockRange.LOOP_STOP} 
                      clockStep={ClockStep.SYSTEM_CLOCK_MULTIPLIER}
                      multiplier={250} 
                      shouldAnimate 
                    />
                  
                    <CustomDataSource >
                      { userPreferences }
                      <PlaylistModal show={state.modalShow} onHide={handleModalShow}/>
                      <VideoModal show={state.videoModalShow} onHide={handleVideoModalShow}/>
                    </CustomDataSource>
                  </Viewer>
                </div>
              </MaterialTitlePanel>
            </Sidebar>
        </main>
    
      </div>
    );
  }
)





