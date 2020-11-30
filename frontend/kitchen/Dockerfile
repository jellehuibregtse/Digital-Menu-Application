FROM node:10-alpine as build-step

EXPOSE 3000

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app

# create the optimized build
RUN yarn build

# command to run
RUN yarn global add serve
CMD ["serve", "-s", "build"]