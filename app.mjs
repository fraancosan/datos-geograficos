import axios from 'axios';
import fs from 'fs/promises';

const urlBase = 'http://localhost:3000/';
const urlProvincias = urlBase + 'provincias';
const urlDepartamentos = urlBase + 'departamentos';
const urlLocalidades = urlBase + 'localidades';

async function importProvincias() {
  const data = await fs.readFile('./provincias.json');
  const provincias = JSON.parse(data);

  await Promise.all(
    provincias.provincias.map(async (provincia) => {
      // fields to import
      const { nombre } = provincia;
      await axios.post(urlProvincias, {
        nombre,
      });
    })
  );

  const { data: provs } = await axios.get(urlProvincias);
  return provs;
}

async function importDepartamentos() {
  const data = await fs.readFile('./departamentos.json');
  const departamentos = JSON.parse(data);

  await Promise.all(
    departamentos.departamentos.map(async (departamento) => {
      // fields to import
      const {
        nombre,
        provincia: { nombre: nombreProv },
      } = departamento;

      const idProvincia = provincias.find((p) => p.nombre === nombreProv).id;
      await axios.post(urlDepartamentos, {
        nombre,
        idProvincia,
      });
    })
  );
}

async function importLocalidades() {
  const data = await fs.readFile('./localidades.json');
  const localidades = JSON.parse(data);
  const localidadesArray = [];
  await Promise.all(
    localidades.localidades.map(async (localidad) => {
      // fields to import
      const {
        nombre,
        departamento: { nombre: nombreDep },
        provincia: { nombre: nombreProv },
      } = localidad;

      const idProvincia = provincias.find((p) => p.nombre === nombreProv).id;

      const {
        data: [{ id: idDepartamento }],
      } = await axios.get(
        urlDepartamentos +
          '?nombre=' +
          nombreDep +
          '&idProvincia=' +
          idProvincia
      );

      if (
        localidadesArray.find(
          (l) => l.nombre === nombre && l.idDepartamento === idDepartamento
        )
      )
        return;
      localidadesArray.push({ nombre, idDepartamento });

      await axios.post(urlLocalidades, {
        nombre,
        idDepartamento,
      });
    })
  );
}

const provincias = await importProvincias();
await importDepartamentos();
await importLocalidades();
