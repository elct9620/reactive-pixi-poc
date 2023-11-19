import { createContext } from "react";
import { Container } from "inversify";
import * as UseCase from "./usecase";
import * as Repository from "./repository";
import * as Entity from "./entity";
import { Event, EventBusSymbol } from "./event";
import { Subject } from "rxjs";
import { Engine } from "matter-js";

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
container
  .bind<UseCase.Projection<void, Entity.Key[]>>(UseCase.ListKeyProjection)
  .to(Repository.ListKeys)
  .inSingletonScope();
container
  .bind<UseCase.Repository<Entity.Key>>(UseCase.KeyRepository)
  .to(Repository.Keys)
  .inSingletonScope();
container.bind<Engine>(Engine).toConstantValue(
  Engine.create({
    gravity: { x: 0, y: 0 },
  }),
);

export default container;
export const InjectContext = createContext({ container });
