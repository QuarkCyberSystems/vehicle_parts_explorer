# -------------------------------------
# 1) Build Stage
# -------------------------------------
    FROM node:18-alpine AS build

    WORKDIR /app
    COPY package*.json ./
    
    RUN npm install
    COPY . .
    
    # Build the production files (static)
    RUN npm run build
    
    # -------------------------------------
    # 2) Production Stage
    # -------------------------------------
    FROM nginx:stable-alpine
    
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    