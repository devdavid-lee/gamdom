export interface ISportEvent {
  eventId: number;
  eventName: string;
  odds: number;
}

export interface ICreateSportEvent {
  eventName: string;
  odds: number;
}

export interface IUpdateSportEvent {
  eventName?: string;
  odds?: number;
}
