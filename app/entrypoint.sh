#!/bin/sh
# app/entrypoint.sh

# Esperar a que la base de datos PostgreSQL esté disponible
echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Ejecutar las migraciones de la base de datos
echo "Running database migrations..."
python manage.py migrate --noinput

# Recolectar archivos estáticos
echo "Collecting static files..."
python manage.py collectstatic --no-input --clear

# Ejecutar el comando pasado al contenedor (gunicorn)
exec "$@"
