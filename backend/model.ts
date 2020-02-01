import { join } from 'path'
import fs from 'fs';
import path from 'path'
import mongoose from 'mongoose'
import generator from 'mongoose-gen';
import createMongooseSchema from 'json-schema-to-mongoose';
import schemaParser from './schema-parser';

export const buildModels = async (dir, app, configSwaggerExpress) => {
    dir = path.join(dir, '/schema');
    const models = await readModels(dir, configSwaggerExpress);
    console.log(`Setting models in app ${Object.keys(models).length}`);
    app.set('models', models);
    return models;
}
export const readModels = async (dir, configSwaggerExpress) => {
    return readModelSchemaParser(dir, configSwaggerExpress);
}

const readModelSchemaParser = async (dir, configSwaggerExpress) => {
    const r: any = await schemaParser(dir, configSwaggerExpress.baseUri)
    return r.schemas;
}
export const readModelsFiles = async (dir, configSwaggerExpress) => {
    const models = {};
    const files = fs.readdirSync(dir)
        .map(f => join(dir, f))
        .filter(f => getFileExtension(f) == 'json');



    const dataDir = join(dir, 'data')
    const filesData = fs.readdirSync(dataDir)
        .map(f => join(dataDir, f))
        .filter(f => getFileExtension(f) == 'json')

    const finalFiles = [...files, ...filesData];
    for (let i = 0; i < finalFiles.length; i++) {
        const f = finalFiles[i];

        const data = await import(f);
        console.log(`Reading file ${f}`)
        const name = getFilename(f);
        let schema;
        try {
            if (f.indexOf('/schema/data/') > 0) {
                console.log('Making schema from Data') // If is Array infer the Model
                delete data.default;
                console.log(data)
                schema = new mongoose.Schema(generator.convert(data));
            } else {
                console.log('Making schema from JSONSchema') //If is an object make its a JSONSchema

                const mongooseSchema = createMongooseSchema(data);
                schema = new mongoose.Schema(mongooseSchema);
            }


            // get file name

            if (schema) {
                console.log('Making Model')
                const model = mongoose.model(name, schema);
                models[name] = model;
            }

        } catch (e) {
            console.log(`Error ${name}`, e)
        }

    }
    return models
}

export const getFilename = (x) => {
    const xx = x.split('/')
    return xx[xx.length - 1].split('.')[0]
}

export const getFileExtension = (x) => {
    const xx = x.split('/')
    return xx[xx.length - 1].split('.')[1]
}