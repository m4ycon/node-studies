FROM node:16.14.0-alpine3.15

WORKDIR /app

# set database connection string
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

COPY package*.json .
RUN yarn

# to use knex cli
RUN yarn global add knex

COPY . .

CMD ["yarn", "start"]
