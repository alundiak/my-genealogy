import './App.css'
// import { getRandomInt } from './common/helpers';
// import { finalDataBasic } from './components/nicknames-cloud/prepareData';
import { finalDataWithCount } from './components/nicknames-cloud/prepareData';
import TagCloud from './components/nicknames-cloud/TagCloud';

function App() {
  return (
    <>
      <TagCloud cloudData={finalDataWithCount()} />
    </>
  )
}

export default App
