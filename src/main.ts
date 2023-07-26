import { env } from "./env";
import { PrismaRepositoryFactory } from "./infra/factory/DatabaseRepositoryFactory";
import { FastifyAdapter } from "./presentation/router/FastifyAdapter";
import { RouteConfig } from "./presentation/router/RouteConfig";


const wf = new FastifyAdapter()
const repositoryFactory = new PrismaRepositoryFactory()
new RouteConfig(wf,repositoryFactory)
wf.listen(env.PORT)