FROM node

WORKDIR /var/www

ADD . .

RUN echo 'nameserver 8.8.8.8' > /etc/resolv.conf
RUN npm i && npm i --only=dev


CMD npm run dev