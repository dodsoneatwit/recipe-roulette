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

# 6. Expose port 8080 (your backend likely runs here)
EXPOSE 8080

# 7. Start your app
CMD ["node", "server.js"]