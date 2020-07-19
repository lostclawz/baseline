FROM node

WORKDIR /app
COPY package.json .
RUN npm install

EXPOSE 8080
EXPOSE 3000

CMD [ "npm", "start" ]

COPY . .
