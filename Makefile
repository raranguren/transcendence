NAME = transcendance
COMPOSE_FILE = transcendance/docker-compose.yml
FOLDERS = .volumes/db

all: build up

$(FOLDERS):
	mkdir -p $@

# Build images
build:
	docker compose -p $(NAME) -f $(COMPOSE_FILE) build

# Runs images as containers. Logs in the background
up: $(FOLDERS)
	docker compose -p $(NAME) -f $(COMPOSE_FILE) up -d --remove-orphans

# Stop and remove containers
down:
	docker compose -p $(NAME) -f $(COMPOSE_FILE) down

# Show logs
logs log:
	docker compose -p $(NAME) -f $(COMPOSE_FILE) logs

# Remove images, networks and volumes
clean: down
	docker compose -p $(NAME) -f $(COMPOSE_FILE) down -v --rmi local

# Also remove downloaded images like node:24, build cache, and volumes
fclean: clean
	docker system prune -a -f --volumes
	rm -fr $(FOLDERS)

# Quick rebuild
re: clean all

.PHONY: all build up down logs log clean fclean re