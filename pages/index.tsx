import { NextPage } from 'next';
import KakaoMap from '../components/kakaomap';
import FileUploader from '../components/fileuploader';
import Options from '../components/options';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

interface Options {
  from: number;
  to: number;
}
const defaultOptions: Options = {
  from: 0,
  to: 0
}

const Home: NextPage<{}> = () => {
  const [locations, setLocations] = useState([]);
  const [validLocations, setValidLocations] = useState([]);
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    let startIdx = 0 , endIdx = 0;
    if (!options.from && !options.to) {
      if (locations && locations.length !== 0) {
        let lastDate = new Date(parseInt(locations[locations.length - 1].timestampMs))
        lastDate = new Date(lastDate.yyyymmdd());
        setOptions({
          ...options,
          to: lastDate.getTime() + 15 * 60 * 60 * 1000 - 1,
          from: lastDate.getTime() - 13 * 24 * 60 * 60 * 1000
        })
      }
    } else if (options.from && options.to) {
      for (startIdx = 0 ; startIdx < locations.length ; startIdx ++) {
        if (parseInt(locations[startIdx].timestampMs) >= options.from) {
          break;
        }
      }
      for (endIdx = startIdx ; endIdx < locations.length ; endIdx ++) {
        if (parseInt(locations[endIdx].timestampMs) >= options.to) {
          break;
        }
      }
      setValidLocations(locations.slice(startIdx, endIdx));
    } else {
      setValidLocations([]);
    }
  }, [locations, options.from, options.to])

  return <Main>
    <div className="input">
      <div id="uploader">
        <FileUploader setLocations={setLocations}/>
      </div>
      <div id="options">
        <Options options={options} setOptions={setOptions}/>
      </div>
    </div>
    <div id="viewer">
      <KakaoMap validLocations={validLocations} />
    </div>
  </Main>
};

const Main = styled.div`
  position: relative;
  display: flex;
  .input {
    flex-direction: column;
  }
  #uploader {
    width: 200px;
    height: 100px;
    margin: 10px;
    padding: 20px;
    border: 1px solid #DDD;
  }
  #options {
    width: 200px;
    height: calc(100vh - 100px - 154px);
    margin: 10px;
    padding: 20px;
    border: 1px solid #DDD;
  }
  #viewer {
    width: calc(100vw - 300px);
    height: calc(100vh - 100px);
    margin: 10px;
    padding: 20px;
    border: 1px solid #DDD;
  }
`

export default Home;