fetch('http://localhost:3000/api/cms/upload', {
  method: 'POST',
  body: new FormData()
}).then(res => res.json()).then(console.log).catch(console.error)
