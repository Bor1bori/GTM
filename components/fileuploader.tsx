import { NextPage } from 'next';

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

  return (<div>
    <label>
      파일 업로드
      <input id="" type="file" accept=".json" onChange={onFileUpload}></input>
    </label>
  </div>)
}

export default FileUploader;