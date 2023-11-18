import { createContext } from "react";
import { Container } from "inversify";
import * as UseCase from "./usecase";
import * as Repository from "./repository";
import * as Entity from "./entity";
import { Event, EventBusSymbol } from "./event";
import { Subject } from "rxjs";

const container = new Container({
  autoBindInjectable: true,
});
container
  .bind<Subject<Event>>(EventBusSymbol)
  .toConstantValue(new Subject<Event>());
container
  .bind<UseCase.Repository<Entity.Player>>(UseCase.PlayerRepository)
  .to(Repository.Players)
  .inSingletonScope();

export default container;
export const InjectContext = createContext({ container });
