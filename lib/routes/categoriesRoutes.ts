import {Request, Response} from "express";
import {CategoriesController} from "../controllers/categoriesController";

export class Routes {

  public categoriesController: CategoriesController = new CategoriesController();

  public routes(app): void {
    // app.route('/')//teste parar verificar funcionalidade
    //   .get((req: Request, res: Response) => {
    //     res.status(200).send({
    //       message: 'GET request test successful'
    //     })
    //   });
    app.route('/categories')
    //get all categories
      .get(this.categoriesController.getAllCategories);

    app.route('/categories/:id')
    //get specific category
      .get(this.categoriesController.getCategoriesById);

    //create new category
    app.route('/categories')
      .post(this.categoriesController.addCategories);
  }
}