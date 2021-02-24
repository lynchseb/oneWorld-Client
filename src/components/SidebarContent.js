import React, { useState } from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitlePanel";
import Modal from 'react-bootstrap/Modal';
// import { Cartesian3, CameraFlyTo } from "cesium";
// // import { Viewer, Entity, CustomDataSource, Globe, Clock } from "resium";


const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
 const [topics, setTopics] = useState(["Politics", "World Events", "Comedy", "Movies", "Sport", "Art", "Science", "Nature", "Environment", "Cooking", "Fashion", "Local Wonders", "Local News"])
 const [modal, setModal] = useState(false)

  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;
   
  const links = [];

  const handleRemove = (arg) => {
    // console.log(`fire with this ${arg}`)
    const iRemove = topics.indexOf(arg)
    const newTopics = [...topics]
    newTopics.splice(iRemove, 1)
    setTopics([...newTopics])
  }


  for (let ind = 0; ind < topics.length; ind++) {
    links.push(
      <a key={ind} href="#" onClick={() => props.handleQ(topics[ind])} style={styles.sidebarLink}>
        {topics[ind]}
        <button onClick={() => handleRemove(topics[ind])} type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </a>
    );
  }

  const openModal = (evt) => {
    evt.preventDefault()
    setModal(true)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setTopics(prev => ([...prev, evt.target.videoSearch.value]))
    setModal(false)
  }

  // const closeModal = (evt)

  return (
    <MaterialTitlePanel title="Welcome: UserName" style={style}>
      <div style={styles.content}>
        <a href="#" style={styles.sidebarLink}>
          Logout
        </a>
        <a onClick={() => props.showFort()} style={styles.sidebarLink}>
          Favourites
        </a>
        <div style={styles.divider} />
        {links}
        <a onClick={openModal}  className={"btn btn-primary"}>
          Add Custom Preference
        </a>
      </div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        show={modal}
        onHide={() => setModal(false)}
       
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <form onSubmit={handleSubmit}className='ui form'>
                    <div className='field'>
                        <label htmlFor="newPreference">Search Preference</label>
                        <input name='videoSearch' type="text" />
                    </div>
                    <button className={"btn btn-primary"}>Add</button>
                </form>
        </Modal.Body>
      </Modal>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;