import { validateParameters } from "./validations";
import o2x from 'object-to-xml';
import express from 'express';
import pascalCase from 'pascalcase';
import { print } from "./utils";



export const makeRoute = (router, method, routePath, endpoint, swaggerExpress) => {
    print(`Creating  ${method} endpoint on ${routePath} `);
    router[method]('/', (req, res) => {
        print(`Running  ${method} endpoint on ${routePath} `);
        if (!validateParameters(req, res, endpoint, swaggerExpress)) {
            return;
        }
        switch (method) {
            case 'get':
                makeGET(req, res, routePath, endpoint);
                break;
            case 'post':
                makePOST(req, res, routePath, endpoint);
                break;
            case 'put':
                makePUT(req, res, routePath, endpoint);
                break;
            case 'delete':
                makeDELETE(req, res, routePath, endpoint);
                break;
            case 'patch':
                makePATCH(req, res, routePath, endpoint);
                break;
        }
    });
}

const getModelName = (routePath) => {
    const routeName = routePath.split('/')[1];
    const modelName = pascalCase(routeName);
    return modelName;
}

const getModel = (app, routePath) => {
    const models = app.get('models');
    const modelName = getModelName(routePath);
    const model = models[modelName].model;
    return model;
}
export const makeGET = async (req, res, routePath, endpoint) => {
    const model = getModel(req.app, routePath);
    const data = await model.find();
    makeResponse(req, res, endpoint, data);
}

export const makePOST = async (req, res, routePath, endpoint) => {
    const model = getModel(req.app, routePath);
    const data = await model.create(req.body);
    res.status(201);
    makeResponse(req, res, endpoint, data);
}

export const makePUT = async (req, res, routePath, endpoint) => {
    const model = getModel(req.app, routePath);
    const query = makeQuery(req);
    const data = await model.findOneAndUpdate(query, req.body, { new: true });
    if(!data){
        res.status(404);
    }else{
        res.status(200);
    }
    
    makeResponse(req, res, endpoint, data);
}

export const makeDELETE = async (req, res, routePath, endpoint) => {
    const model = getModel(req.app, routePath);
    transformCamelCaseId(req, routePath);
    const query = makeQuery(req);
    const data = await model.remove(query);
    if (data && data.deletedCount > 0) {
        res.status(204);
    } else {
        res.status(404);
    }

    makeResponse(req, res, endpoint);
}


export const makePATCH = async (req, res, routePath, endpoint) => {
    const model = getModel(req.app, routePath);
    console.log('PATCH', model)
    transformCamelCaseId(req, routePath);
    const query = makeQuery(req);
    const data = await model.findOneAndUpdate(query, req.body, { new: true, overwrite: true });
    res.status(200);
    makeResponse(req, res, endpoint, data);
}

const makeQuery = (req) =>{
    let query;
    if (Object.keys(req.params).length > 0) {
        query = req.params;
    } else {
        query = { _id: req.body._id }
    }
    return query;
}


const transformCamelCaseId = (req, routePath) =>{
    const modelName = getModelName(routePath);

    const idName = modelName.toLowerCase() + "Id";
    for (const key in req.params) {
        if (key === idName) {
            req.params['_id'] = req.params[key]
            delete req.params[key];
        }
    }
}

export const makeResponse = (req, res, endpoint: any, data: any = null) => {
    const produces: any = {};
    if (endpoint.produces) {
        endpoint.produces.forEach(p => produces[p] = true);
    }
    if (!data) {
        res.send()
    } else if (req.get('accept') === 'application/xml' && produces['application/xml']) {
        // res.set('Content-Type', 'text/xml');
        // res.send(o2x({
        //     '?xml version="1.0" encoding="utf-8"?': null,
        //     data
        // }));
        //TODO 
        res.json(data);
    } else {
        res.json(data);
    }


}



export const buildRoutes = (swaggerExpress, app, configSwaggerExpress) => {
    const paths = swaggerExpress.runner.swagger.paths;

    for (const key in paths) {
        const endpointMethods = paths[key];
        const router = express.Router({ mergeParams: true });
        const routePath = replaceAllParamsUrl(key);
        for (const method in endpointMethods) {
            // print(`Creating  ${method} endpoint on ${key} `);
            makeRoute(router, method, routePath, endpointMethods[method], swaggerExpress);
        }

        const basepath = swaggerExpress.runner.swagger.basePath + routePath;
        // print(`---- Using route middleware ${basepath}`);

        app.use(basepath, router);
    }
}

const replaceAllParamsUrl = (str) => {
    var re = new RegExp('}', 'g');
    str = str.replace(re, '');

    var re = new RegExp('{', 'g');
    str = str.replace(re, ':');
    return str;
}