# mean-crud-generator
Mongoose, Express, Angular e Nodejs generator with OpenAPI3 that generates the frontend and JSONSchema to generate the backend

1. Frontend: Create your Open API 3 schema using [swagger editor](https://swagger.io/tools/swagger-editor/)
2. Backend: Create a JSONSchema for your data (or Generate from Open API Schema) using the [JSON Schema Editor](https://jsonschema.net/)

All the endpoints, docs, mongo schemas, express and Angular CRUD components ready to use!


## Live Example

Base on this [Open API Schema example](./demo/api/index.yaml) and this [JSON Schema example](./demo/schema/pet.json) , it created the backend and docs:

* DOCUMENTATION: https://mean-crud-generator.herokuapp.com/docs/
* API: https://mean-crud-generator.herokuapp.com/api/pet/findByStatus?status=available

## Run this project

Fork and clone to your computer, then do `npm i`.

Run `npm run dev` than you can see the demo project using the Pet Swagger example:

`http://localhost:8080/docs`


See how to start one app, this is your JS code:

```ts
import express from 'express';
import { BaseApp , startMeanCrudServer } from 'mean-crud-generator';

// Create your own app express
let app = express();

// or use our Base App
app = BaseApp;

// Provide your app and the directory with the Open API Schemas and JSONSchemas
startMeanCrudServer(app, __dirname)
.then(()=>{
    app.listen(8080, () => {
        console.log(`Listen to port ${8080}`);
    });
});
```

Then create a Open API File like this [Demo Open APi](./demo/api/index.yaml) using the Swagger Editor.

And if want to specife your data schema, make like this [JSONSchema example](./demo/schema/pet.json) with JSONSchema Editor.

After running this app you can access:
* API DOCS: `http://localhost:8080/docs`
* API: `http://localhost:8080/api`
* APP: `http://localhost:8080/app`

# References

## Editors

* https://jsonschema.net/


## Links

* https://github.com/fliptoo/swagger-express
* https://github.com/swagger-api/swagger-node

### Model

* https://github.com/jon49/json-schema-to-mongoose
* https://transform.tools/json-to-json-schema
* https://www.npmjs.com/package/generate-schema
* https://github.com/YousefED/typescript-json-schema
* https://github.com/topliceanu/mongoose-gen


Repo example mongood jsonschem working:
* https://github.com/glitchdigital/structured-data-api/

## Install

npm install -g swagger

# TODO

* Frontend generation with Angular (in progress)
* Generate missing JSONSchemas based on the Open API
* Generate missing declarations in Open API Based on JSONSchemas
* Validation from data type based on OpenAPI Schema (help wanted)
* Special builtin datatype validation like credit cards, phones... (help wanted)
* Special builtin datatype with js-brasil for example (help wanted)
* Make JSONSchemas Editable in a Admin Section  (help wanted)
* Make Open API Schemas editable in Admin Section  (help wanted)
* Frontend generation with React (future)
