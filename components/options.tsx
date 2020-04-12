import { NextPage } from 'next';
import styled from 'styled-components';

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

const Options: NextPage<{options: any, setOptions: any}> = ({options, setOptions}) => {
  const onDateChange = (e) => {
    console.log('value: ', e.target.value);
    const differ = e.target.name === "from" ? - 9 * 60 * 60 * 1000 : (15 * 60 * 60 * 1000 - 1);
    setOptions({...options, 
      [e.target.name]: e.target.value ? new Date(e.target.value).getTime() + differ : 0
    })
  }

  return (<Main>
    미입력시 가장 최근 2주일의 기록만 보여줌.
    <label>
      From
      <br/>
      <input value={options.from ? new Date(options.from).yyyymmdd() : ''} onChange={onDateChange} name="from" type="date"
        min={options.to ? new Date(options.to - 13 * 24 * 60 * 60 * 1000).yyyymmdd() : ''}
        max={options.to ? new Date(options.to).yyyymmdd() : ''}></input>
    </label>
    <br/>
    <label>
      To
      <br/>
      <input value={options.to ? new Date(options.to).yyyymmdd() : ''} onChange={onDateChange} name="to" type="date"
        min={options.from ? new Date(options.from).yyyymmdd() : ''}
        max={options.from ? new Date(options.from + 13 * 24 * 60 * 60 * 1000).yyyymmdd() : ''}></input>
    </label>
  </Main>)
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
`

export default Options;