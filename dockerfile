FROM node:latest AS node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/rms/browser /usr/share/nginx/html