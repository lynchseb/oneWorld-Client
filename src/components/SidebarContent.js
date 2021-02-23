import React, { useState } from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitlePanel";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { sampleTerrainMostDetailed } from "cesium";


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
 const [topics, setTopics] = useState(["Politics", "World Events", "Comedy", "Movies", "Sport", "Art", "Science", "Nature", "Environment", "Agriculture", "Food", "Fashion", "Local Wonders", "Local News"])
 const [modal, setModal] = useState(false)

  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;
   
  const links = [];

  for (let ind = 0; ind < topics.length; ind++) {
    links.push(
      <a key={ind} href="#" onClick={() => props.handleQ(topics[ind])} style={styles.sidebarLink}>
        {topics[ind]}
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
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <a href="#" style={styles.sidebarLink}>
          Logout
        </a>
        <div style={styles.divider} />
        {links}
        <a onClick={openModal} style={styles.sidebarLink}>
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