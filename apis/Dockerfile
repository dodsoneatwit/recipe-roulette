# 1. Use an official Node.js image as the base
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy your package.json and package-lock.json first
COPY package*.json ./

# 4. Install dependencies inside the container
RUN npm install --production

# 5. Copy all remaining source code into the container
COPY . .

RUN npm run build

# 6. Expose port 3000
EXPOSE 3000

# 7. Start your app
CMD ["npm", "start"]