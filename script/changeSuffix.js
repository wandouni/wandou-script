var path = require('path');
var fs = require('fs');

const targetDir = path.resolve(__dirname, '../src');

function readDirOrFile(targetDir) {
  const dirs = fs.readdirSync(targetDir);
  dirs.forEach(dir => {
    const currentPath = path.join(targetDir, dir);
    const stat = fs.statSync(currentPath);
    if (stat.isDirectory()) {
      readDirOrFile(currentPath);
    } else {
      const extname = path.extname(currentPath);
      const basename = path.basename(currentPath);
      const name = basename.slice(0, basename.indexOf(extname));
      if (extname === '.js') {
        fs.rename(currentPath, path.join(targetDir, name + '.ts'), () => {});
      }
      if (extname === '.jsx') {
        console.log(path.join(targetDir, name + '.tsx'));
        fs.rename(currentPath, path.join(targetDir, name + '.tsx'), () => {});
      }
    }
  });
}

readDirOrFile(targetDir);
