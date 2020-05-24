const fs = require('fs');
const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
}

module.exports = function loader(source) {
    const options = getOptions(this);

    validateOptions(schema, options, 'Example Loader');

    source = source.replace(/\[name\]/g, options.name);

    fs.writeFile('./loader_source.js', source, 'utf8', (err) => {
        if (err) {
            console.log('loader_source错误:', err);
            throw err;
        }
        console.log('loader_source输出完毕');
    });

    return `export default ${JSON.stringify(source)}`;
};