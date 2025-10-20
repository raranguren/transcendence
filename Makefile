NAME = transcendance
COMPOSE_FILE = srcs/docker-compose.yml

all: build up

build:
	docker compose -p $(NAME) -f $(COMPOSE_FILE) build

up:
	docker compose -p $(NAME) -f $(COMPOSE_FILE) up -d --remove-orphans

down:
	docker compose -p $(NAME) -f $(COMPOSE_FILE) down

logs:
	docker compose -p $(NAME) -f $(COMPOSE_FILE) logs

clean: down
	docker system prune -a -f --volumes

fclean: clean

re: clean all

.PHONY: all build up down logs clean fclean re