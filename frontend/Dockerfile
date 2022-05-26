FROM node:16

WORKDIR /app

COPY . /app

ENV REACT_APP_REST=/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]