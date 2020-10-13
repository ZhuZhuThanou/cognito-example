const fileSystem = require('fs');
const archiver = require('archiver');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: ''
});





const output = fileSystem.createWriteStream('angular-target.zip');
const archive = archiver('zip');


output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    const fileContent = fileSystem.readFileSync('angular-target.zip');
    const params = {
      Bucket: 'sample-build-coco',
      Key: 'angular-target.zip', // File name you want to save as in S3
      Body: fileContent
    };
    s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory('./dist', false);

archive.finalize();