# Datos Geograficos Argentina

Este proyecto esta realizado para importar de manera fácil y sencilla todos los datos geograficos de argentina a una base de datos mediante el uso de un endpoint de backEnd

> [!NOTE]
> Esta app unicamente se encarga de filtrar los datos geograficos de los .JSON y enviarlos a un endpoint en donde debera estar implementado la lógica que guarde los datos en algún lugar.

> [!IMPORTANT]
> Los datos se obtuvieron de la [Api Georef](https://www.argentina.gob.ar/datos-abiertos/georef/openapi#/), perteneciente a argentina. En el [siguiente enlace hay una mejor documentación](https://datosgobar.github.io/georef-ar-api/)
>
> Algunos datos fueron modificados para poder adaptarlos a usos generales. Por ejemplo: se elimino el departamento 'Antártida Argentina'
>
> Si se quieren usar los datos oficiales se pueden descargar a traves de los enlaces previamente mencionados o incluso usar su API para obtenerlos mediantes consultas.

## ¿Cómo usarlo?

- Instalar dependencias: **npm install**
- Configurar **urls** que se encuentran en la parte superior de la app.
- Tener en funcionamiento un servidor de peticiones propio que gestionen el guardado de los datos y que le asigne un ID propio a cada provincia / departamento / localidad.
- Ejecutar la aplicacion: **npm run start**

## ¿Cómo configurar los datos importados?

- En el código se detalla mediante comentarios en donde se extraen los campos del .JSON, habria que extraer otros y configurar que se envien tambien
