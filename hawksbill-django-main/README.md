# hawksbill-django

Motor de base datos: MySQL

-Instalar python3.8 o superior, junto con venv de python.
-Crear un entorno virtual para el proyecto y activarlo.
-Instalar del requirements del proyecto de django, con el comando pip install -r requirements.txt
-En las carpetas del proyecto hawksbill-django,  dentro de hawksbill/settings crear una copia del archivo deploy_settings.py en el mismo directorio.
-Dicho archivo debe ser nombrado con "local_settings.py" y alli se debe especificar el nombre de la base de datos, contraseña, puerto y localhost
-Una vez configurado el enrutamiento de la base de datos, estando dentro del entorno virtual, ejecutar el comando python3 manage.py makemigrations,
luego de este ejecutar el comando python3 manage.py migrate.
-Una vez migrados los modelos de la base de datos, se debe crear un superusuario con el siguiente comando: python3 manage.py createsuperuser, se diligencian los datos solicitados y se da enter.
-Tras crear el usuario se debe ejecutar el siguiente comando dentro de la carpeta "hawksbill-django-main": python3 manage.py runserver.
-Se desplegara el servidor de django y estara en escucha de las peticiones por parte del front.
-Dicha configuracion del front se encuentra en el readme.txt de la carpeta "hawksbill-react-main".
