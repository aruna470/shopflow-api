From node:carbon

WORKDIR /api
COPY . .
RUN npm install --prodution
EXPOSE 8080 3000
CMD ["npm", "run", "start"]