const fs = require('fs');
const { join } = require('path');

// if (process.argv.length === 2) {
//   console.error('Expected at least one argument!');
//   process.exit(1);
// }

const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => join(source, name))
    .filter(source => fs.lstatSync(source).isDirectory())
    .map(name => name.split('/').pop());

const getFiles = source =>
  fs
    .readdirSync(source)
    .map(name => join(source, name))
    .filter(s => !s.includes('index'))
    .map(
      name =>
        name
          .split('/')
          .pop()
          .split('.')[0]
    );

// process.argv.splice(0, 2);

// const paths = process.argv.map(p => join(process.cwd(), p));
const paths = [
  'src/components',
  'src/components/atoms',
  'src/components/particles',
  'src/hooks',
  'src/data',
  'src/utils',
  'src/screens',
];

paths.forEach(p => {
  const entries = getDirectories(p).length ? getDirectories(p) : getFiles(p);

  const imports = entries.reduce((acc, folder) => `${acc}export * from './${folder}';\n`, '');

  fs.writeFile(`${p}/index.ts`, imports, err => {
    if (err) {
      return console.log(err);
    }
  });
});
