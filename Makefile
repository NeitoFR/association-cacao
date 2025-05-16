.PHONY: up

up: ## Start the application
	docker-compose -f ./ops/docker-compose.yml up -d
	@echo "Access UI: http://localhost:4321"

.PHONY: restart

restart: ## Restart the application
	docker-compose -f ./ops/docker-compose.yml restart
	@echo "Access UI: http://localhost:4321"

.PHONY: down

down: ## Stop the application
	docker-compose -f ./ops/docker-compose.yml down

.PHONY: kill

kill: ## Stop the application
	docker-compose -f ./ops/docker-compose.yml kill

.PHONY: build

build: ## Build the application
	docker-compose -f ./ops/docker-compose.yml build

.PHONY: logs

logs: ## Show logs for the front service
	docker-compose -f ops/docker-compose.yml logs front --follow

.PHONY: exec

exec: ## Execute a shell in the front service
	docker-compose -f ./ops/docker-compose.yml exec front sh

# Used to sync the changes done on the development Strapi before committing.
.PHONY: fetch-strapi-changes
fetch-strapi-changes: ## Fetch Strapi files from the development pod
	@echo "Fetching Strapi files from dev pod..."
	FILES=".gitignore .strapi .strapi-updater.json README.md config database package-lock.json package.json public src tsconfig.json types"; \
	for FILE in $$FILES; do \
		kubectl cp -n cacao-dev $(shell kubectl get pods -l app.kubernetes.io/name=strapi -n cacao-dev -o jsonpath='{.items[0].metadata.name}'):/app/$$FILE ./strapi/$$FILE; \
	done
	@echo "Files copied to ./strapi"

.PHONY: help
help:
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'