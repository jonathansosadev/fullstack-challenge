const express = require('express');
const cors = require('cors')
const axios = require('axios').default;
const { parse } = require("csv-parse");
const fs = require('fs');
const app = express();
const port = 8000;
const token = 'aSuperSecretKey';

app.use(cors());

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const configDownload = {
  headers: { Authorization: `Bearer ${token}` },
  responseType: 'blob'
};

app.get('/files/list', (request, response) => {
  axios.get('https://echo-serv.tbxnet.com/v1/secret/files', config).then(responseList => {
    response.type('application/json');
    response.send(responseList.data);
  }).catch(error => {
    console.log(error)
  });
})

app.get('/files/data', (request, response) => {
  let data = [];
  const name = request.query.fileName;

  if (name != undefined) {
    axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${name}`, configDownload).then(responseFile => {
      fs.writeFile(`./${name}`, responseFile.data, (err) => {
        if (err) console.log(err);
        let auxiliar = {
          file: name,
          lines: []
        };
        fs.createReadStream(`./${name}`)
          .pipe(parse({ delimiter: ",", from_line: 2, relax_column_count: true }))
          .on("data", function (row) {
            if (row.length === 4) {
              auxiliar.lines.push({
                text: row[1],
                number: row[2],
                hex: row[3]
              })
            }
          })
          .on("end", function () {
            data.push(auxiliar)
            response.type('application/json');
            response.send(data);
          })
          .on("error", function (error) {
            console.log(error);
          });
      });
    }).catch(error => {
      console.log(error);
      response.type('application/json');
      response.send(data);
    });
    
  } else {
    axios.get('https://echo-serv.tbxnet.com/v1/secret/files', config).then(responseList => {
      const totalFiles = responseList.data.files.length;
      let count = 0;
      const name = request.query.fileName;


      if (totalFiles > 0) {
        responseList.data.files.forEach((element, index) => {
          axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${element}`, configDownload).then(responseFile => {
            fs.writeFile(`./${element}`, responseFile.data, (err) => {
              let auxiliar = {
                file: element,
                lines: []
              };
              if (err) throw err;
              fs.createReadStream(`./${element}`)
                .pipe(parse({ delimiter: ",", from_line: 2, relax_column_count: true }))
                .on("data", function (row) {
                  if (row.length === 4) {
                    auxiliar.lines.push({
                      text: row[1],
                      number: row[2],
                      hex: row[3]
                    })
                  }
                })
                .on("end", function () {
                  count++;

                  if (auxiliar.lines.length > 0) {
                    data.push(auxiliar)
                  }

                  if (count === totalFiles) {
                    response.type('application/json');
                    response.send(data);
                  }
                })
                .on("error", function (error) {
                  console.log(error.message);
                });
            });
          }).catch(error => {
            count++;

            if (count === totalFiles) {
              response.type('application/json');
              response.send(data);
            }
          });
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }
})

module.exports = app.listen(port, () => {console.log(`API REST run on port ${port}`)});

