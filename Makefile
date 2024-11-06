.PHONY: up

up:
	docker-compose -f ./ops/docker-compose.yml up -d
	@echo "Access UI: http://localhost:4321"

.PHONY: restart

restart:
	docker-compose -f ./ops/docker-compose.yml restart
	@echo "Access UI: http://localhost:4321"

.PHONY: down

down:
	docker-compose -f ./ops/docker-compose.yml down
	@echo "Access UI: http://localhost:4321"

.PHONY: build


.PHONY: logs

logs:
	docker-compose -f ops/docker-compose.yml logs front --follow

build:
	docker-compose -f ./ops/docker-compose.yml build

.PHONY: exec

exec:
	docker-compose -f ./ops/docker-compose.yml exec front sh

# Used to sync the changes done on the development Strapi before committing.
.PHONY: fetch-strapi-changes
fetch-strapi-changes:
	@echo "Fetching Strapi files from dev pod..."
	FILES=".gitignore .strapi .strapi-updater.json README.md config database package-lock.json package.json public src tsconfig.json types"; \
	for FILE in $$FILES; do \
		kubectl cp -n cacao-dev $(shell kubectl get pods -l app.kubernetes.io/name=strapi -n cacao-dev -o jsonpath='{.items[0].metadata.name}'):/app/$$FILE ./strapi/$$FILE; \
	done
	@echo "Files copied to ./strapi"