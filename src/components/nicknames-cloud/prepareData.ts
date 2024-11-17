import { VulgoDataWithCount, VulgoDataRaw, VulgoDataExtended } from './models';
import vulgoDataBasic from './data/vulgoDataBasic.json';
import vulgoDataExtended from './data/vulgoDataExtended.json';


// Value should be high enough to contains all strings on page visually representative OK
const maxNumberForCloudSize = 25;

// v1
export const finalDataBasic = (): VulgoDataWithCount[] => {
  const { main, other } = vulgoDataBasic;

  let interimData: string[] = main;

  const concatOther = false;
  if (concatOther) {
    interimData = main.concat(other);
  }

  return interimData.map((vulgoStringValue: string) => ({
    vulgo: vulgoStringValue,
    count: maxNumberForCloudSize
  }));
}

// v2
export const finalDataWithCount = (): VulgoDataExtended[] => {
  const { main, other } = vulgoDataExtended;

  let interimData = [...main] as VulgoDataRaw[];

  // const otherWithDefaults: VulgoDataRaw[] = other.map((item) => ({
  //   surnames: undefined,
  //   reason: undefined,
  //   reasonType: undefined,
  //   count: undefined,
  //   ...item
  // }));

  const concatOther = true;
  if (concatOther) {
    interimData = main.concat(other as any[]) as VulgoDataRaw[];
    // interimData = main.concat(otherWithDefaults];
  }

  const ret: VulgoDataExtended[] = interimData.map((data) => {
    return {
      ...data,
      count: maxNumberForCloudSize
    }
  });

  console.log(ret);

  return ret;
}
