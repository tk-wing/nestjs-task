FROM node:alpine

WORKDIR /home/app/DocumentRoot
COPY ./package*.json /home/app/DocumentRoot/

RUN npm i

CMD ["npm", "run", "start:dev"]
