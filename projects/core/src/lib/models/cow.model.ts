export enum CowEventType {
  WeightCheck = 'Weight Check',
  Treatment = 'Treatment',
  MovedPen = 'Moved to Another Pen',
  Death = 'Death'
}

export interface CowEvent {
  type: CowEventType;
  description: string;
  date: Date;
}

export enum CowStatus {
  Active = 'Active',
  InTreatment = 'In Treatment',
  Deceased = 'Deceased'
}

export interface Cow {
  id: number;
  earTag: string;
  gender: 'Male' | 'Female';
  pen: string;
  status: CowStatus;
  lastEventDate: Date;
  weight?: number;
  dailyWeightGain?: number;
  events?: CowEvent[];
}