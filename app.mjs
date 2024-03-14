import axios from 'axios';
import fs from 'fs/promises';

const url = 'http://localhost:3000/';

async function importProvincias() {
  const data = await fs.readFile('./provincias.json');
  const provincias = JSON.parse(data);

  await Promise.all(
    provincias.provincias.map(async (provincia) => {
      const { nombre } = provincia;
      await axios.post(url + 'provincias', {
        nombre,
      });
    })
  );
}

async function importDepartamentos() {
  const data = await fs.readFile('./departamentos.json');
  const departamentos = JSON.parse(data);

  await Promise.all(
    departamentos.departamentos.map(async (departamento) => {
      const { nombre, provincia } = departamento;
      const {
        data: [{ id: idProvincia }],
      } = await axios.get(url + 'provincias?nombre=' + provincia.nombre);

      await axios.post(url + 'departamentos', {
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
      const { nombre, departamento } = localidad;
      const {
        data: [{ id: idDepartamento }],
      } = await axios.get(url + 'departamentos?nombre=' + departamento.nombre);

      if (
        localidadesArray.find(
          (l) => l.nombre === nombre && l.idDepartamento === idDepartamento
        )
      )
        return;
      localidadesArray.push({ nombre, idDepartamento });

      await axios.post(url + 'localidades', {
        nombre,
        idDepartamento,
      });
    })
  );
}

await importProvincias();
await importDepartamentos();
await importLocalidades();
