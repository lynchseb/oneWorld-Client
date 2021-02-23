
// Dependency Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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


export default hot(function Application() {
  
  const [state, setState] = useState({
    docked: false,
    open: false,
    transitions: true,
    videos: [],
    selectedVideos: null,
    modalShow: false,
    videoModalShow: false,
    fortressModalShow: false,
    q: "Comedy",
    location: "",
    favourites: [],
  
  });
  
  const [getUserPreferences, setUserPreferences] = useState([])

  const handleQ = (arg) => {
    const newState = {...state}
    newState.q = arg
    setState(prev => ({...prev, ...newState}))
    // console.log(`I worked! and here is my button ${arg} and this is my q state ${state.q}`)
  }

  const handleRemove = (arg) => {
    console.log(`fire with this ${arg}`)
    const newState ={...state}
    newState.q.slice(arg)
    setState(prev => ({...prev, ...newState}))
  }

  const handleFavourite = (favourite) => {
  
    state.favourites.push(favourite)
    // console.log(state.videos)
    // console.log(favourite)
    // axios.post('http://localhost:3001/favourites')

  }

  // Youtube API requests Begin
 
  useEffect(() => {
   axios.get('http://localhost:3001/markers')
   .then(res => {
     const arr = []
     res.data.markers.forEach((marker) => {
       const lat = parseFloat(marker.lat)
       const lng = parseFloat(marker.lng)
       const cartMark = {
         ...marker,
        
        position: Cartesian3.fromDegrees(lat, lng, 100)
       }
       arr.push(cartMark)
     })
     setUserPreferences(arr)
    //  console.log(arr)
   })
   .catch(e => {
     console.log(e)
   })
  }, [])

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
        <Button variant={"primary"} size={"lg"} block onClick={() => handleFavourite(state.selectedVideo)}> Favourite </Button>
      </Modal>
    );
  }

  function FortressModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body>
        <div className='ui container' style={{marginBottom: '1em'}}>
            <div className='ui grid'>
              <div className="ui row">
                 <div className="five wide column">
                   <VideoList handleVideoSelect={handleVideoSelect} videos={state.favourites}/>
                  </div>
                </div>
            </div>
          </div>   
           <div className="eleven wide column">
               <VideoDetail video={state.selectedVideo}/>
            </div>   
            
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  const handleModalShow = (location) =>  {
    
    const newState = {...state}
    newState.modalShow = true
    newState.location = location
    setState(prev => ({...prev, ...newState}))
    // console.log(entity.location)
    fetchVideos(location)
    // console.log(`current location is ${state.location}`)
  }

  const handleCloseModal = () => {
  setState(prev => ({...prev, modalShow: false}))
  }

  const handleVideoModalShow = () =>  {
    const newState = {...state}
    newState.videoModalShow = true
    newState.modalShow = false
    newState.fortressModalShow = false
    setState(prev => ({...prev, ...newState}))
  }

  const handleCloseVideoModal = () => {
    setState(prev => ({...prev, videoModalShow: false }))
  }

  const handleFortressModalShow = () => {
    const newState = {...state}
    newState.fortressModalShow = true
    newState.modalShow = false
    setState(prev => ({...prev, ...newState}))
  }

  const handleFortressModalClose = () => {
    setState(prev => ({...prev, fortressModalShow: false}))
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
  
  // Youtube API methods begin
 

  const handleSubmit = async (termFromSearchBar) => {
    const location = state.location
    const response = await youtube.get('/search', {
        params: {
          part: 'snippet',
          location,
          locationRadius: "50mi",
          maxResults: 10,
          type: "video",
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
          locationRadius: "50mi",
          maxResult: 10,
          q,
          type: "video",
          key: "",
        }
    })
    setState(prev => ({...prev,  videos: response.data.items})) 
  };

    const handleVideoSelect = (video) => {
   
    handleVideoModalShow()
    setState(prev => ({...prev, selectedVideo: video}))
  }

  // YouTube API methods end

  // Entity Builder Begin
   
  const userPreferences = getUserPreferences.map((entity) => {
    return ( 
      <Entity 
        onClick={() => handleModalShow(entity.location)} 
        key={entity.id} 
        position={entity.position} 
        name={entity.name} 
        description={entity.description} 
        api={entity.api}
        point={{ pixelSize: 15, color: Color.ORANGE }} >
      </Entity>
    )
  }) 

  //Entity Builder end

  const sidebar = <SidebarContent handleQ={handleQ} handleRemove={handleRemove} showFort={handleFortressModalShow}/>;

  const contentHeader = (
    <span className='span-head'>
         <a onClick={menuButtonClick} href="#" style={styles.contentHeaderMenuLink}>
          = oneWorld
        </a> 
        
        <span>{`Now searching: ${state.q}`}</span>
    
        <span> {renderPropCheckbox()} </span>
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
              <MaterialTitlePanel title={contentHeader} >
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
                      <PlaylistModal show={state.modalShow} onHide={handleCloseModal}/>
                      <VideoModal show={state.videoModalShow} onHide={handleCloseVideoModal}/>
                      <FortressModal show={state.fortressModalShow} onHide={handleFortressModalClose}/>
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





