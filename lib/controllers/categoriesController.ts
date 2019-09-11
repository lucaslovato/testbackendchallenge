import {CategoriesModel} from "../models/categoriesModel";
import {Request, Response} from "express";

const HTTPStatus = require("http-status-codes");


export class CategoriesController {

  /**
   * adiciona uma nova categoria indicando o nome dela, caso esta tenha childrenIds o banco verifica se estes existem
   * caso nao existam retorna o erro de childrenIds invalidos
   * @param req
   * @param res
   */
  public addCategories(req: Request, res: Response) {
    let message;
    let status;
    let newCategory = new CategoriesModel(req.body);
    newCategory.save((err, categories) => {
      if (err) {
        status = HTTPStatus.BAD_REQUEST;
        message = {ok: false, message: "InvalidCategories"}
      } else {
        status = HTTPStatus.OK;
        message = {ok: true}
      }
      res.status(status).send(message);
    });
  }

  /**
   * retorna todas as categorias, aceita limite e paginacao
   * @param req
   * @param res
   */
  public getAllCategories(req: Request, res: Response) {
    const skip = parseInt(req.query.skip, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 25;
    CategoriesModel.find({}, (err, categories) => {
      if (err) {
        res.send(err).status(HTTPStatus.UNPROCESSABLE_ENTITY);
      }
      res.json(categories).status(HTTPStatus.OK);
    }).skip(skip).limit(limit);
  }

  /**
   * retorna uma categoria especifica pelo id indicado como parametro
   * @param req
   * @param res
   */
  public getCategoriesById(req: Request, res: Response) {
    CategoriesModel.findById(req.params.id, (err, categories) => {
      if (err) {
        res.send(err).status(HTTPStatus.UNPROCESSABLE_ENTITY);
      }
      res.json(categories).status(HTTPStatus.OK);
    })
  }
}