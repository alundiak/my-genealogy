import './App.css'
// import { getRandomInt } from './common/helpers';
// import { finalDataBasic } from './components/nicknames-cloud/prepareData';
import { finalDataWithCount } from './components/nicknames-cloud/prepareData';
import TagCloud from './components/nicknames-cloud/TagCloud';

import FanChart from './components/family-tree-fan-chart/FanChart';
import { fanChartData } from './components/family-tree-fan-chart/fanChartData.ts';
// import data from './components/family-tree-fan-chart/data.json';

// import { NivoSunburst } from './components/family-tree-fan-chart/NivoSunburstFromSite.tsx';
// import nivoSunburstData from './components/family-tree-fan-chart/nivo-sunburst-from-site-data.json';

import { NivoFamilyTreeSunburst } from './components/family-tree-fan-chart/NivoFamilyTreeSunburst.tsx';


function App() {
  return (
    <>
      <TagCloud cloudData={finalDataWithCount()} />
      <FanChart width={500} height={500} data={fanChartData} />

      {/* <div className="nivo-container">
        <NivoSunburst data={nivoSunburstData} />
      </div> */}

      {/* <NivoFanChart data={nivoFamilyData} /> */}

      <NivoFamilyTreeSunburst />
    </>
  )
}

export default App
