name:=web
VERSION:=$(shell cat ./package.json | jq -r '.version')

info: #Show envs
	@echo "service name: ${name}"
	@echo "version: ${VERSION}"

## Build:
.PHONY: build-docker
build-docker: ## Build project in docker and upload it
	docker build -t cuppa/${name}:v${VERSION} --platform linux/arm64 .
	docker tag cuppa/${name}:v${VERSION} rpisoulv1.kube:31320/cuppa/${name}:v${VERSION}
	docker push rpisoulv1.kube:31320/cuppa/${name}:v${VERSION}

## Build:
.PHONY: build-docker-local
build-docker-local: ## Build project in docker and upload it
	docker build -t cuppa-${name} .

.DEFAULT_GOAL := help
.PHONY: help
all: help
## Help:
help: ## Show this help.
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-20s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(MAKEFILE_LIST)
