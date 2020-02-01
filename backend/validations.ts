export const validateParameters = (req, res, endpoint, swaggerExpress) => {

    let errors: any = [];
    endpoint.parameters
        .filter(param => param.required)
        .forEach(param => {
            let value = null;
            switch (param.in) {
                case "header":
                    value = req.get(param.name);
                    break;
                case "path":
                    console.log(req.params, req.query, req.originalUrl)
                    value = req.params[param.name];
                    break;
                case "formData":
                    value = req.formData[param.name];
                    break;
                case "body":
                    // console.log(param, swaggerExpress.runner.swagger.definitions)
                    const definitions  = swaggerExpress.runner.swagger.definitions;
                    if(param.schema && param.schema.$ref){
                        const vals = param.schema.$ref.split('/');
                        const definition = vals[vals.length -1];
                        const definitionObject = definitions[definition];
                        const props = definitionObject.properties;
                        const required = definitionObject.required;
                        if(required){
                            required.forEach(r=>{
                                value = req.body[r]
                                if (!value) {
                                    const prop = props[r] || {};
                                    errors.push({
                                        name: r,
                                        description: `Field type ${prop.type} example: ${prop.example}`
                                    });
                                }
                            });
                        }
                        return;
                    }else{
                        value = req.body[param.name];
                    }
                    
                    break;
                case "query":
                    value = req.query[param.name];
                    break;
                default:
                    console.error(`Parameter in type not found ${param.in}`);
                    break;
            }
            if (!value) {
                errors.push({
                    name: param.name,
                    param: param.in,
                    description: param.description
                });
            }
            // validate param.type (string, number...)
        })

    if (errors.length == 0) {
        return true;
    } else {
        let message = 'Parameter validation error';
        if (endpoint.responses && endpoint.responses[400] && endpoint.responses[400].description) {
            message = endpoint.responses[400].description;
        }
        res.status(400).json({ message, errors });
    }
}