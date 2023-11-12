import { createContext } from "react";
import { Container } from "inversify";
import * as UseCase from "./usecase";
import * as Repository from "./repository";
import * as Entity from "./entity";
import { Event, EventBusSymbol } from "./event";
import { Subject } from "rxjs";

const container = new Container();
container.bind<Subject<Event>>(EventBusSymbol).toConstantValue(new Subject<Event>());
container.bind<UseCase.Repository<Entity.Player>>(UseCase.PlayerRepositorySymbol).to(Repository.Players).inSingletonScope()
container.bind<UseCase.Command<UseCase.AttackCommandInput, boolean>>(UseCase.AttackCommandSymbol).to(UseCase.AttackCommand);
container.bind<UseCase.Query<UseCase.PlayerQueryInput, UseCase.PlayerQueryOutput>>(UseCase.PlayerQuerySymbol).to(UseCase.PlayerQuery);

export default container;
export const InjectContext = createContext({ container })
