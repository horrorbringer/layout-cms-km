const fs = require('fs');

async function testUpload() {
  try {
    const formData = new FormData();
    const fileBlob = new Blob(['hello world'], { type: 'text/plain' });
    formData.append('file', fileBlob, 'test.txt');

    const response = await fetch('http://localhost:3000/api/cms/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testUpload();
