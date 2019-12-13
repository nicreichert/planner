const fs = require('fs');
const { join } = require('path');
const chokidar = require('chokidar');

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

const paths = [
  'src/components',
  'src/components/atoms',
  'src/components/particles',
  'src/hooks',
  'src/data',
  'src/utils',
  'src/screens',
];

const updateExports = () => {
  paths.forEach(p => {
    const entries = getDirectories(p).length ? getDirectories(p) : getFiles(p);

    const imports = entries.reduce((acc, folder) => `${acc}export * from './${folder}';\n`, '');

    fs.writeFile(`${p}/index.ts`, imports, err => {
      if (err) {
        return console.log(err);
      }
    });
  });
};

chokidar
  .watch(paths.map(p => `${p}/*`), {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
    ignored: '*/index.ts',
  })
  .on('all', () => {
    updateExports();
  });

updateExports();
