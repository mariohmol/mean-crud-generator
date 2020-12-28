import * as config from './config';
import SwaggerExpress from 'swagger-express-mw';
import SwaggerUi from 'swagger-tools/middleware/swagger-ui';
import meanCrudGenerator from '../backend';
import mongoose from 'mongoose';
import fs from 'fs';
import yaml from 'js-yaml';
import app from './app';

const startMeanCrudServer = (app, dirname) => {
    return new Promise((resolve, reject) => {

        let baseUri = 'http://localhost:8080/';

        if (process.env.BASE_URI) {
            baseUri = process.env.BASE_URI.replace(/\/$/, '');
        } else {
            require('dns').lookup(require('os').hostname(), function (err, ipAddress, fam) {
                baseUri = "http://" + ipAddress + ":" + (process.env.PORT || 3000);
            });
        }

        const swaggerFile = dirname + 
        // '/api/openapi.json'
        '/api/index.yaml';

        const swaggerJson = dirname + '/api/index.json';
        var configSwaggerExpress = {
            appRoot: dirname,
            swaggerFile,
            baseUri
        };

        var doc = yaml.safeLoad(fs.readFileSync(swaggerFile, 'utf8'));
        let data = JSON.stringify(doc, null, 2);
        fs.writeFileSync(swaggerJson, data);

        // Saving back to YAMLfs.writeFileSync(dirname + '/api/./peer.yaml',yaml.safeDump(doc))

        SwaggerExpress.create(configSwaggerExpress, function (err, swaggerExpress) {
            if (err) { reject(err); console.error(err); return; }

            // GEN
            meanCrudGenerator(swaggerExpress, configSwaggerExpress, dirname, app);

            app.get('/docs/api.json', (_,res) => res.download(swaggerJson));

            // Add swagger-ui (This must be before swaggerExpress.register)
            app.use(SwaggerUi(swaggerExpress.runner.swagger));


            // install middleware
            // swaggerExpress.register(app);

            const { DATABASE_URL } = config;

            const db = mongoose.connect(DATABASE_URL);

            console.log(`Connected to db at ${DATABASE_URL}`);
            resolve();


            // if (swaggerExpress.runner.swagger.paths['/hello']) {
            //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
            // }
        });
    })
}


export default startMeanCrudServer; // for testing