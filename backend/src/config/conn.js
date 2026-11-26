import {Sequelize} from "sequelize"

export const conn = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});