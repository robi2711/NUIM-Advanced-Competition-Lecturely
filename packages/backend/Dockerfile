FROM node:alpine
WORKDIR /
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
LABEL authors="Robert, Raoul, Christian"
