export const EventBusSymbol = Symbol('EventBus')
export interface Event {
  id: string;
}
export interface PlayerUpdated extends Event {}
