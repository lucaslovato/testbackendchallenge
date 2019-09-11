import * as mongoose from 'mongoose';
import {model} from "mongoose";

const Schema = mongoose.Schema;


const CategoriesSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: 'Name is required'
  },
  childrenIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "category",
    }],
    validate: {
      validator: async function (childrenIds) {
        const existing_categories = await CategoriesModel.count({_id: {$in: childrenIds}});
        return existing_categories === childrenIds.length;
      },
      message: "InvalidCategories"
    }
  }
});



let CategoriesModel = mongoose.model("category", CategoriesSchema);

export { CategoriesModel };