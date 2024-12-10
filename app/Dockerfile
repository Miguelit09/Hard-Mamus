FROM python:3.9-slim

# Instalar dependencias
WORKDIR /app
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . /app