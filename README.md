# github-client
A simple client to take data from Github API

# Observaciones:
Es necesario utilizar un servidor web para que la aplicación funcione correctamente (apache, IIS, etc)

Los archivos estaticos de la carpeta dist son generados al ejecutar gulp, normalmente esta carpeta la incluyo en el gitignore pero para que no sea obligatorio en este caso ejecutar gulp lo dejo como parte del repositorio.

El código que genera el contenido del directorio dist es el directorio src, el cual aconsejo utilizar para ver el código porque está sin minificar.

En caso de querer generar de nuevo la carpeta dist con nodejs y npm instalados ejecutar el comando 'npm install' después del git clone y después ejecutar el comando 'gulp'

Si añadiera tests los realizaría con el framework javascript mochajs (https://mochajs.org/)