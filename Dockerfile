# Build Vite app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Inject ENV
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN echo "Building FrontEnd With API URL:  $VITE_API_URL"
RUN npm run build

# Serve via nginx
FROM nginx:stable-alpine

# Copy
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
