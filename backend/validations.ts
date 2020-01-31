export const validateParameters = (req, res, endpoint) => {

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
                    value = req.param[param.name];
                    break;
                case "formData":
                    value = req.formData[param.name];
                    break;
                case "body":
                    value = req.body[param.name];
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