FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# Install deps inside container
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
