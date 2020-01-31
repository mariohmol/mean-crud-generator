import { join } from 'path'
import fs from 'fs';
import path from 'path'
import mongoose from 'mongoose'
import createMongooseSchema from 'json-schema-to-mongoose';

export const buildModels = (dir) =>{
    dir = path.join(dir, '/schema');
    readModels(dir, []) ;
}
export const readModels = (dir, allFiles: any = []) => {
    const models = {};
    const files = fs.readdirSync(dir).map(f => join(dir, f))
    allFiles.push(...files)
    files.forEach(async f => {
        // fs.statSync(f).isDirectory() && rreaddirSync(f, allFiles)
        // const data = await fs.readFileSync(f);
        const data = await import(f);
        console.log(`Reading file ${f}`)
        // const json = JSON.parse(data);
        const mongooseSchema = createMongooseSchema(data);
        console.log('Making schema')
        const schema = new mongoose.Schema(mongooseSchema);
        const name = getfilename(f);
        // get file name
        console.log('Making Model')
        const model = mongoose.model(name, schema);
        models[name] = model;
    })
    return models
}

export const getfilename = (x)=>{
    const xx= x.split('/')
    return xx[xx.length-1].split('.')[0]
}