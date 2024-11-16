import './App.css'
// import { getRandomInt } from './common/helpers';
import { NickNamesDataForTagCloud } from './common/models';
import TagCloud from './components/TagCloud';
// import nicknames from './data/nicknames.json';
import nicknames from './data/nicknames2.json';

const { main, other } = nicknames;

let interimData: string[] = main;

const concatOther = false;
if (concatOther) {
  interimData = main.concat(other);
}

// const finalData = main;
const finalData: NickNamesDataForTagCloud[] = interimData.map((nick: string) => {
  // Value should be high enough to contains all strings on page visually representative OK
  const maxNumberForCloudSize = 25;
  return {
    name: nick,
    count: maxNumberForCloudSize
  }
});

// console.log(finalData);

function App() {
  return (
    <>
      <TagCloud cloudData={finalData} />
    </>
  )
}

export default App
