FROM node:latest

WORKDIR /usr/local/users

ENV USER_PORT=${USER_PORT}
ENV NODE_ENV="production"
ENV USER_DATABASE_URI=${USER_DATABASE_URI}
ENV ADMIN_SECRETS=${ADMIN_SECRETS}

COPY package.json package-lock.json /usr/local/users

RUN npm i && npm cache clean --force

RUN npm i -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]
