const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

axios.get('https://coderbyte.com/api/challenges/json/age-counting')
  .then(response => {
    const data = response.data.data;

    // Count items with age equal to 32
    const items = data
      .split(',')
      .map(item => item.trim().split('='))
      .filter(([key, value]) => key === 'age' && parseInt(value) === 32);

    // Get the key values
    const keyValues = items.map(([key]) => key);

    // Write key values to output.txt
    const writeStream = fs.createWriteStream('./output.txt');
    keyValues.forEach(key => writeStream.write(key + '\n'));
    writeStream.end();

    // Calculate SHA1 hash of output.txt
    const hash = crypto.createHash('sha1');
    const fileStream = fs.createReadStream('./output.txt');
    fileStream.on('data', chunk => hash.update(chunk));
    fileStream.on('end', () => {
      const sha1Hash = hash.digest('hex');
      console.log('SHA1 hash:', sha1Hash);
    });
  })
  .catch(error => {
    console.log('Error:', error.message);
  });