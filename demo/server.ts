import * as config from './config';
import SwaggerExpress from 'swagger-express-mw';
import SwaggerUi from 'swagger-tools/middleware/swagger-ui';
import meanCrudGenerator from '../backend';
import mongoose from 'mongoose';
import app from './app';


var configSwaggerExpress = {
    appRoot: __dirname,
    swaggerFile: __dirname + '/api/index.yaml'
};

SwaggerExpress.create(configSwaggerExpress, function (err, swaggerExpress) {
    if (err) { throw err; }

    // GEN
    meanCrudGenerator(swaggerExpress, configSwaggerExpress, __dirname, app);

    // Add swagger-ui (This must be before swaggerExpress.register)
    app.use(SwaggerUi(swaggerExpress.runner.swagger));

    // install middleware
    swaggerExpress.register(app);

    const { PORT, DATABASE_URL } = config;

    const db = mongoose.connect(DATABASE_URL);

    console.log(`Connected to db at ${DATABASE_URL}`);
    app.listen(PORT, () => { // const server = 
        console.log(`Listen to port ${PORT}`);

    });


    // if (swaggerExpress.runner.swagger.paths['/hello']) {
    //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    // }
});

export default app; // for testing