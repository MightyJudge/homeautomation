FROM arm32v7/node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set strict-ssl false
RUN npm install --only=prod
COPY . .
EXPOSE 8080 3000
CMD [ "npm", "start" ]
