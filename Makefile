.PHONY: up

up:
	docker-compose -f ./ops/docker-compose.yml up -d


.PHONY: build

build:
	docker-compose -f ./ops/docker-compose.yml build