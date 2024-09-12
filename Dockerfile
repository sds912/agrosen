# Étape 1 : Construire l'application Angular
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

RUN npm install -g @angular/cli

COPY . .

# Assurez-vous que le dossier de sortie est correct
RUN ng build --configuration=production

# Étape 2 : Copier la build dans l'image NGINX
FROM nginx:latest

# Copie du build Angular dans le répertoire NGINX
COPY --from=build /app/dist/[rms] /usr/share/nginx/html

EXPOSE 80
