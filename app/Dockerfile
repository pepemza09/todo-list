# app/Dockerfile
# Define la imagen para el contenedor de la aplicación Django.

# Usar una imagen base de Python
FROM python:3.9-slim-bullseye

# Establecer variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Instalar dependencias del sistema
RUN apt-get update \
  && apt-get -y install netcat-traditional \
  && apt-get clean

# Instalar dependencias de Python
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el script de entrada y darle permisos de ejecución
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Copiar el resto del código de la aplicación
COPY . .

# El entrypoint se encargará de ejecutar los comandos necesarios
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]