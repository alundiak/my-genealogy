import './App.css'
// import { getRandomInt } from './common/helpers';
// import { finalDataBasic } from './components/nicknames-cloud/prepareData';
import { finalDataWithCount } from './components/nicknames-cloud/prepareData';
import TagCloud from './components/nicknames-cloud/TagCloud';
import FanChart from './components/family-tree-fan-chart/FanChart';
import { familyData } from './components/family-tree-fan-chart/familyData';
// import data from './components/family-tree-fan-chart/data.json';


function App() {
  return (
    <>
      {/* <TagCloud cloudData={finalDataWithCount()} /> */}
      <FanChart width={500} height={500} data={familyData} />
    </>
  )
}

export default App
