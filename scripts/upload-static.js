// 通过 ftp 将 dist 目录上传到云服务器
// 1. 安装 ftp 插件
// npm install ftp --save-dev
// 2. 创建 ftp.js
import fs from 'fs';
import Ftp from 'ftp';
import path from 'path';

let processingCount = 0;

function checkEnd() {
  if (processingCount === 0) {
    ftp.end();
  }
}

function uploadDirectory(localDir, remoteDir) {
  processingCount++;
  fs.readdir(localDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('read directory error', err);
      processingCount--;
      checkEnd();
      return;
    }

    files.forEach((file) => {
      const localPath = path.join(localDir, file.name);
      const remotePath = path.join(remoteDir, file.name);

      if (file.isDirectory()) {
        // If the file is a directory, create the directory on the remote server and recurse into it
        processingCount++;
        ftp.mkdir(remotePath, true, (err) => {
          console.log('[mkdir]', localPath, remotePath);
          if (err) {
            console.log('❌ mkdir error', err);
          } else {
            console.log('✅ mkdir success', localPath, '→', remotePath);
            uploadDirectory(localPath, remotePath);
          }
          processingCount--;
          checkEnd();
        });
      } else {
        // If the file is a file, upload it to the remote server
        processingCount++;
        ftp.put(localPath, remotePath, (err) => {
          console.log('[put]', localPath, remotePath);
          if (err) {
            console.log('❌ put error', err, localPath, remotePath);
          } else {
            console.log('✅ put file success', localPath, '→', remotePath);
          }
          processingCount--;
          checkEnd();
        });
      }
    });
    processingCount--;
    checkEnd();
  });
}

const ftp = new Ftp();

ftp.connect({
  host: '120.78.141.29',
  user: 'ftpuser',
  password: 'hello123'
});

ftp.on('ready', () => {
  console.log('ftp ready');

  const localPath = path.resolve(process.cwd(), 'dist');
  const remotePath = '/var/www/xx';

  console.log('localPath', localPath);
  console.log('remotePath', remotePath);

  uploadDirectory(localPath, remotePath);
});

ftp.on('error', (err) => {
  console.log('ftp error', err);
});

// 3. 修改 package.json
// "scripts": {
//   "deploy": "node ftp.js"
// }
// 4. 执行命令
// npm run deploy
