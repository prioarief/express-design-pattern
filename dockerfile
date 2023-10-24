FROM node:14-alpine
RUN npm install pm2 -g
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --force
# RUN npm install pm2 -g
# Copy app files
COPY . .
# Expose port
EXPOSE 5000
# Start the app
# CMD ["pm2-runtime", "start", "ecosystem.config.js"]
# CMD [ "npm", "start" ]
CMD ["pm2-runtime", "index.js", "--exit-on-complete"]