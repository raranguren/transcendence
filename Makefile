NAME = transcendance
COMPOSE_FILE = transcendance/docker-compose.yml
FOLDERS = .secrets .volumes .volumes/db .volumes/vault
VAULT_TOKEN_FILE = .volumes/vault/backend-token.txt
VAULT_TOKEN_SECRET = .secrets/vault-token.txt

all: build up

$(FOLDERS):
	@mkdir -p $@
	@echo "🦝 Created folder $@"

$(VAULT_TOKEN_FILE):
	@echo "🦝 Starting vault . . ."
	@docker 	compose -p $(NAME) -f $(COMPOSE_FILE) up vault -d
	@echo "🦝 Waiting for vault token . . ."
	@while [ ! -f "$@" ]; do sleep 1; done

$(VAULT_TOKEN_SECRET): $(VAULT_TOKEN_FILE)
	@cp $^ $@
	@echo "🦝 Saved vault token in secrets!"

# Build images
build:
	@docker compose -p $(NAME) -f $(COMPOSE_FILE) build

# Runs images as containers. Logs in the background
up: $(FOLDERS) $(VAULT_TOKEN_SECRET)
	@docker compose -p $(NAME) -f $(COMPOSE_FILE) up -d --remove-orphans
	@echo "🦝 Vault UI at http://localhost:8200/ui/vault/secrets/secret/kv/backend"
	@echo -n "🦝 Vault UI token is: " && cat .volumes/vault/token.txt

# Stop and remove containers
down:
	@docker compose -p $(NAME) -f $(COMPOSE_FILE) down

# Show logs
logs log:
	clear
	@docker compose -p $(NAME) -f $(COMPOSE_FILE) logs

# Remove images, networks and volumes
clean: down
	@echo "🦝 Removing images and volumes . . ."
	@-docker compose -p $(NAME) -f $(COMPOSE_FILE) down --rmi local
	@docker compose -p $(NAME) -f $(COMPOSE_FILE) down -v
	@docker volume prune -f

# Also remove secrets and volumes
fclean: down
	@echo "🦝 Deleting $(FOLDERS). . ."
	@rm -fr $(FOLDERS) 2>/dev/null \
		|| docker compose -f $(COMPOSE_FILE) \
		run --rm --entrypoint="" vault sh -c "rm -rf /vault/data/*" \
		&& rm -fr $(FOLDERS)
	@$(MAKE) clean --silent

# Quick rebuild
re: clean all

.PHONY: all build up down logs log clean fclean re