.PHONY: up

up:
	docker-compose -f ./ops/docker-compose.yml up -d

.PHONY: build

build:
	docker-compose -f ./ops/docker-compose.yml build

# Used to sync the changes done on the development Strapi before committing.
.PHONY: fetch-strapi-changes
fetch-strapi-changes:
	kubectl cp -n cacao-dev $(shell kubectl get pods -l app.kubernetes.io/name=strapi -n cacao-dev -o jsonpath='{.items[0].metadata.name}'):/app ./strapi