INSTALAR JSON-SERVER DE MANERA LOCAL
1.	Dirigirse a la ruta en que se quiere instalar 
2.	Inicializar un proyecto node.js(Eso si aun no se tiene un package.json)
npm init -y
3.	Instalar Json-server localmente
npm install json-server --save-dev
4.	Ejecutar el json server con la instalación local
npx json-server --watch db.json
5.	Ejecutar el jsonserver
npm run json-server
