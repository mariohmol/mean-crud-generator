import { join } from 'path'
import fs from 'fs';
import path from 'path'
import mongoose from 'mongoose'
import generator from 'mongoose-gen';
import createMongooseSchema from 'json-schema-to-mongoose';

export const buildModels = async (dir, app) => {
    dir = path.join(dir, '/schema');
    const models = await readModels(dir);
    console.log(`Setting models in app ${Object.keys(models).length}`);
    app.set('models', models);
    return models;
}

export const readModels = async (dir) => {
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
                console.log('Making schema from Data') // // If is Array infer the Model
                console.log(data)
                schema = new mongoose.Schema(generator.convert(data));
            } else {
                console.log('Making schema from JSONSchema') //If is an object make its a JSONSchema
                const mongooseSchema = createMongooseSchema(data);
                schema = new mongoose.Schema(mongooseSchema);
            }


            // get file name
            console.log('Making Model')
            const model = mongoose.model(name, schema);
            models[name] = model;
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