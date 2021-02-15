
// Dependency Imports
import React, { useState }from 'react';
import Sidebar from "react-sidebar";

// Enabling HRM
import { hot } from "react-hot-loader/root";

// Resium imports
import { Viewer, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3, createWorldTerrain } from "cesium";

const terrainProvider = createWorldTerrain();
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

export default hot(function Application(props) {
  const [state, setState] = useState({
    sidebarOpen: true
  })
    

  const onSetSidebarOpen = sidebarOpen => setState(prev => ({...prev, sidebarOpen }))
   
  

  return (

    <main>
      <nav>
        <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={state.sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
      </nav>
      <section>
      <Viewer terrainProvider={terrainProvider}>
      <Entity position={position} name="Tokyo">
        <PointGraphics pixelSize={15} />
        <EntityDescription>
          <h1>Hello, world.</h1>
          <p>JSX is available here!</p>
        </EntityDescription>
      </Entity>
    </Viewer>
      </section>

   
    

    </main>
  );
    
  
  
})

