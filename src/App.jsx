import { useState } from 'react'
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

import DeckGL from '@deck.gl/react';
// import Map from 'react-map-gl'; //importing not working
import {load} from '@loaders.gl/core';
import {CSVLoader} from '@loaders.gl/csv';
import {LineLayer} from '@deck.gl/layers';
import './App.css'

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line
// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const rawData = await load(DATA_URL, CSVLoader);
const data = rawData.map(d => [d.lng, d.lat])
// console.log(data)

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const INITIAL_VIEW_STATE = {
  longitude: -1.415727,
  latitude: 52.232395,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};


function App() {
  const layers = [
    new HexagonLayer({
      id: 'heatmap',
      colorRange: colorRange,
      coverage: 1,
      data: data,
      elevationRange: [0, 3000],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: d => d,
      pickable: true,
      radius: 1000,
      upperPercentile: 100,
      material,

      transitions: {
        elevationScale: 3000
      }
    })
  ];
  
  return (
    <div className="App">
         <DeckGL
            layers={layers}
            effects={[lightingEffect]}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            // getTooltip={getTooltip}
          ></DeckGL>
    </div>
  )
}

export default App
