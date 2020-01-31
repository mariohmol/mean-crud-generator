import { validateParameters } from "./validations";
import o2x from 'object-to-xml';

export const makeRoute = (router, method, routePath, endpoint) => {
    console.log(`Creating  ${method} endpoint on ${routePath} `);
    router[method]('/', (req, res) => {
        if (!validateParameters(req, res, endpoint)) {
            return;
        }
        switch (method) {
            case 'get':
                makeGET(req, res, endpoint);
                break;
            case 'post':
                makePOST(req, res, endpoint);
                break;
            case 'put':
                makePUT(req, res, endpoint);
                break;
            case 'delete':
                makeDELETE(req, res, endpoint);
                break;
            case 'patch':
                makePATCH(req, res, endpoint);
                break;
        }
    });
}

export const makeGET = (req, res, endpoint) => {
    const data = { name: 'mario' };
    makeResponse(req, res, endpoint, data);
}

export const makePOST = (req, res, endpoint) => {
    const data = { name: 'mario' };
    res.status(201);
    makeResponse(req, res, endpoint, data);
}

export const makePUT = (req, res, endpoint) => {
    const data = { name: 'mario' };
    res.status(200);
    makeResponse(req, res, endpoint, data);
}

export const makeDELETE = (req, res, endpoint) => {
    res.status(204);
    makeResponse(req, res, endpoint);
}

export const makePATCH = (req, res, endpoint) => {
    const data = { name: 'mario' };
    res.status(200);

    makeResponse(req, res, endpoint, data);
}

export const makeResponse = (req, res, endpoint: any, data: any = null) => {
    const produces: any = {};



    if (endpoint.produces) {
        endpoint.produces.forEach(p => produces[p] = true);
    }
    if (!data) {
        res.send()
    } else if (req.get('accept') === 'application/xml' && produces['application/xml']) {
        res.set('Content-Type', 'text/xml');
        res.send(o2x({
            '?xml version="1.0" encoding="utf-8"?': null,
            data
        }));
    } else {
        res.json(data);
    }


}

