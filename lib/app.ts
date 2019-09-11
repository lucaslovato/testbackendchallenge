import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/categoriesRoutes";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public routeCategories: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost/Categoriesdb';

  constructor() {
    this.app = express();
    this.config();
    this.routeCategories.routes(this.app);
    this.mongoSetup();
  }
  private config(): void{
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  }
  private mongoSetup(): void{
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, {useNewUrlParser: true});
  }
}
export default new App().app;