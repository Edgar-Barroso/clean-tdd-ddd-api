import { PrismaRepositoryFactory } from "./infra/factory/DatabaseRepositoryFactory";
import { DevErrorHandler } from "./presentation/router/DevErrorHandler";
import { FastifyAdapter } from "./presentation/router/FastifyAdapter";
import { RouteConfig } from "./presentation/router/RouteConfig";

const errorHandler = new DevErrorHandler()
const app = new FastifyAdapter(errorHandler)
const repositoryFactory = new PrismaRepositoryFactory()
new RouteConfig(app,repositoryFactory)
export default app