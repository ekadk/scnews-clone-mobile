FROM node:latest
WORKDIR /usr/local/app
ENV NODE_ENV=production
ENV APP_SERVICES_PORT=${APP_SERVICES_PORT}
ENV ADMIN_SECRETS=${ADMIN_SECRETS}

COPY package.json package-lock.json /usr/local/app

RUN npm install && npm cache clean --force
RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]
