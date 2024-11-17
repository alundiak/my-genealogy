export interface VulgoDataWithCount {
  vulgo: string;
  count: number;
}

type ReasonType = 'firstName' | 'lastName' | 'occupation' | 'unknown';

export interface VulgoDataRaw {
  vulgo: string;
  surnames?: string;
  reason?: string;
  reasonType?: ReasonType;
}

export type VulgoDataExtended = VulgoDataRaw & {
  count?: number;
}

export interface TagCloudProps {
  // cloudData: VulgoDataWithCount[];
  cloudData: VulgoDataExtended[];
}
