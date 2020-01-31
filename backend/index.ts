import express from 'express';
import { buildRoutes } from './routes';
import { buildModels } from './model';

const meanCrudGenerator = function(swaggerExpress, configSwaggerExpress, dirname, app = express() ){
    buildModels(dirname);
    buildRoutes(swaggerExpress, app, configSwaggerExpress);

}

export default meanCrudGenerator;

