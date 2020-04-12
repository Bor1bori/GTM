import { NextPage } from 'next';
import axios from 'axios';

const FileUploader: NextPage<{setLocations: any}> = ({setLocations}) => {

  let fileReader: FileReader;

  const handleFileRead = (e) => {
    setLocations(JSON.parse(fileReader.result as string).locations);
  }
  const onFileUpload = (e) => {
    fileReader = new FileReader();
    fileReader.onload = handleFileRead;
    fileReader.readAsText(e.target.files[0]);
  }

  const onSampleUpload = () => {
    axios.get('/api/sample').then((res) => {
      setLocations(res.data.locations);
    })
  }
  return (<div>
    <label>
      파일 업로드
      <br/>
      <button onClick={onSampleUpload}>sample 등록</button>
      <input id="" type="file" accept=".json" onChange={onFileUpload}></input>
    </label>
  </div>)
}

export default FileUploader;