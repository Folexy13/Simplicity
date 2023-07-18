# Configure .env file access
include ./server/.env
export

DOCKER_IMAGE = simplicity_image
MONGODB_CONTAINER_NAME = simplicityDB
MONGODB_IMAGE_VERSION = 4.4
NETWORK_NAME = host

# Build the Docker image
build:
	docker build -t $(DOCKER_IMAGE) .

# Create a Docker network
network:
	docker network create $(NETWORK_NAME)

# Start the MongoDB container
start-db:
	docker run --name $(MONGODB_CONTAINER_NAME) -p 27017:27017 -d mongo:$(MONGODB_IMAGE_VERSION)

# Run the Docker container
run:
	docker run --network $(NETWORK_NAME) --name $(DOCKER_IMAGE) $(DOCKER_IMAGE)

# Start the MongoDB and Node.js containers
start: start-db run

# Stop and remove the Docker containers and network
stop:
	docker stop $(MONGODB_CONTAINER_NAME) $(DOCKER_IMAGE) || true && \
	docker rm $(MONGODB_CONTAINER_NAME) $(DOCKER_IMAGE) || true

clean:
	docker rmi $(DOCKER_IMAGE)

# Start the frontend locally
frontend:
	cd client && yarn dev

# Start the backend locallly
backend:
	cd server && yarn dev

# Start the production build
production:
	cd client && yarn build & cd server && yarn dev

# Help target to display available commands
help:
	@echo "Available targets:"
	@echo "- build: Build the Docker image"
	@echo "- network: Create a Docker network"
	@echo "- start-db: Start the MongoDB container"
	@echo "- run: Run the Docker container"
	@echo "- start: Start the MongoDB and Node.js containers"
	@echo "- stop: Stop and remove the Docker containers and network"
	@echo "- clean: Remove the Docker image"
	@echo "- frontend: Start the frontend development server"
	@echo "- backend: Start the backend development server"
	@echo "- production: Start the production build"

.PHONY: build network start-db run start stop clean frontend backend production help
