import { Event } from "@/event";

type HookFunction = (event: Event) => void;

export abstract class AggregateRoot<T, E extends Event> {
  [key: string]: HookFunction | unknown;

  public readonly id: T;
  private readonly _domainEvents: E[] = [];
  private version: number = 0;

  protected constructor(id: T, events?: E[]) {
    this.id = id;
    if (events) {
      events.forEach((event) => {
        this.apply(event);
      });
    }
  }

  get domainEvents(): E[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(domainEvent: E): void {
    this._domainEvents.push(domainEvent);
    this.version++;
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  public apply(event: E): void {
    const hookName = `on${event.type}`;
    const hookMethod: HookFunction = this[hookName] as HookFunction;

    if (typeof hookMethod !== "function") {
      throw new Error(`Missing ${hookName} implementation`);
    }

    hookMethod.call(this, event);
    this.addDomainEvent(event);
  }
}
