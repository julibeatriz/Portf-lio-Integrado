import { usuarioModel } from './usuarioModel.js';
import { areaModel } from './areaModel.js';
import { registroModel } from './registroModel.js';

areaModel.hasMany(registroModel, {
  foreignKey: 'id_area'
});

registroModel.belongsTo(areaModel, {
  foreignKey: 'id_area'
});

usuarioModel.hasMany(registroModel, {
    foreignKey: 'id_usuario'
});

registroModel.belongsTo(usuarioModel, {
    foreignKey: 'id_usuario'
});

export { usuarioModel, areaModel, registroModel };