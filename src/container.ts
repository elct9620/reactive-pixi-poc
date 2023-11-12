import { Container } from "inversify";
import * as Controller from "./controller";
import * as Repository from "./repository";
import * as Entity from "./entity";
import { Event, EventBusSymbol } from "./event";
import { Subject } from "rxjs";

const container = new Container();
container.bind<Subject<Event>>(EventBusSymbol).toConstantValue(new Subject<Event>());
container.bind<Controller.Repository<Entity.Player>>(Controller.PlayerRepositorySymbol).to(Repository.Players).inSingletonScope()
container.bind<Controller.Command<Controller.AttackCommandInput>>(Controller.AttackCommandSymbol).to(Controller.AttackCommand);
container.bind<Controller.Query<Controller.PlayerQueryInput, Controller.PlayerQueryOutput>>(Controller.PlayerQuerySymbol).to(Controller.PlayerQuery);

export default container;
