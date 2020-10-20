import React from 'react';
import {useParams} from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import YouTube from 'react-youtube';


const opts = {
  height: '50%',
  width: '50%',
};

function _onReady(event) {
  // access to player in all event handlers via event.target
  // event.target.playVideo();
}

const GET_VIDEO = gql `
  query getVideo($id: Int!){
    person(id: $id) {
      name
    }
  }
`

function Video() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_VIDEO, {
    variables: {id: Number(id)}
  })
  console.log('loading, data: ', loading, data);
  console.log(typeof id)
  return (
    <div>
      <h1>video</h1>
      <div style={{width: '80vw', height: '20vw', border: '2px solid #000'}}>
        <YouTube videoId="A_QaD1D-S2A" opts={opts} onReady={_onReady} />;
      </div>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        {loading ? 'Loading...' : data.person.name}
      </div>

    </div>
  )
}

export default Video;