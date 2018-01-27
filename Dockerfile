FROM node

WORKDIR /var/www

ADD . .

RUN npm i && npm i --only=dev


CMD npm run dev