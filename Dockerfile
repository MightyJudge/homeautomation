FROM ibmcom/ibmnode
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080 3000
CMD [ "npm", "start" ]
