# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code and env file
COPY . .

# Build the React app with environment variables
ARG REACT_APP_BASE_URL=http://localhost:3006
ARG REACT_APP_API=/api/
ARG REACT_APP_LOGIN=/auth/login
ARG REACT_APP_CHECK_AUTH=/auth/verify
ARG REACT_APP_AVATAR=https://cdn.discordapp.com/avatars/

ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_API=$REACT_APP_API
ENV REACT_APP_LOGIN=$REACT_APP_LOGIN
ENV REACT_APP_CHECK_AUTH=$REACT_APP_CHECK_AUTH
ENV REACT_APP_AVATAR=$REACT_APP_AVATAR

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the app
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the app
CMD ["serve", "-s", "build", "-l", "5000"]
