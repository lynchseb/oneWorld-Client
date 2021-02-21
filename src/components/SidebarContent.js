import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitlePanel";


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
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;
   
  const links = [];
  const topics = ["Politics", "World Events", "Comedy", "Movies", "Sport", "Art", "Science", "Nature", "Environment", "Agriculture", "Food", "Fashion", "Local Wonders", "Local News"];

  for (let ind = 0; ind < topics.length; ind++) {
    links.push(
      <a key={ind} href="#" onClick={() => props.handleQ(topics[ind])} style={styles.sidebarLink}>
        {topics[ind]}
      </a>
    );
  }

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        {/* <a href="/" style={styles.sidebarLink}>
          Account Preferences
        </a> */}
        <a href="#" style={styles.sidebarLink}>
          Logout
        </a>
        <div style={styles.divider} />
        {links}
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;