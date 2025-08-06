# nginx/Dockerfile
# Define la imagen para el contenedor de Nginx.

FROM nginx:1.19.0-alpine

# Eliminar la configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración personalizada
COPY nginx.conf /etc/nginx/conf.d