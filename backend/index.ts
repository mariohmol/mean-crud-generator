import express from 'express';
import { makeRoute } from './routes';

export const buildRoutes = (swaggerExpress, app) => {
    const paths = swaggerExpress.runner.swagger.paths;
    for (const key in paths) {
        const endpointMethods = paths[key];
        const router = express.Router();
        for (const method in endpointMethods) {
            console.log(key, method)
            console.log(`Creating  ${method} endpoint on ${key} `);
            makeRoute(router, method, key, endpointMethods[method]);
        }

        const basepath = swaggerExpress.runner.swagger.basePath + key
        console.log(`---- Using route middleware ${basepath}`);

        app.use(basepath, router);
    }
}



