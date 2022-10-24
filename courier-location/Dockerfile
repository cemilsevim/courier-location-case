FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/courier-location
WORKDIR /var/www/courier-location
ADD . /var/www/courier-location
RUN npm install
CMD npm run build && npm run start:prod