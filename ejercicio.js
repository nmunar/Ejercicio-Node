const axios = require("axios");
const fs = require("fs");
const http = require("http");
const url = require("url");

const url_proveedores =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const url_clientes =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

function rend(file, callback) {
  fs.readFile("./index.html", (err, data) => {
    let content = data.toString();
    let texRepl = "";
    let url = "";

    if (file == "Proveedores") {
      url = url_proveedores;
    } else {
      url = url_clientes;
    }

    axios
      .get(url)
      .then((result) => {
        result.data.forEach((men) => {
          texRepl += `<tr>
          <td>${file == "Proveedores" ? men.idproveedor : men.idCliente} </td>
          <td>${
            file == "Proveedores" ? men.nombrecompania : men.NombreCompania
          } </td>
          <td>${
            file == "Proveedores" ? men.nombrecontacto : men.NombreContacto
          } </td>
          </tr>`;
        });
      })
      .then(() => {
        content = content.replace("{{titulo}}", file);
        content = content.replace("{{tabla}}", texRepl);
        callback(content);
      });
  });
};

http
  .createServer(function (req, res) {
    let dns = url.parse(req.url).pathname;

    if (dns == "/proveedores") {
      rend("Proveedores", (data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data.toString());
      });
    } else if (dns == "/clientes") {
      rend("Clientes", (data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data.toString());
      });
    }
  })
  .listen(8081);
