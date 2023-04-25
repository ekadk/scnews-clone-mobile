FROM node:latest

WORKDIR /usr/local/orchestrator

ENV ORCHESTRATOR_PORT=4000
ENV NODE_ENV="production"
ENV USER_SERVICE_BASE_URL=${USER_SERVICE_BASE_URL}
ENV APP_SERVICE_BASE_URL=${APP_SERVICE_BASE_URL}

COPY package.json package-lock.json /usr/local/orchestrator 

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]