FROM node:lts-alpine as build

WORKDIR /app

COPY ./Client/package*.json ./

RUN npm ci

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL $REACT_APP_API_URL

COPY ./Client .

RUN npm run build



#nginx conf
FROM nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]