.PHONY: all dev start mysql
all: dev start mysql
dev:
	@bun dev
start:
	@docker desktop start || true
mysql:
	@docker run \
		--name mysql \
		-it \
		--rm \
		-p 3306:3306 \
		-e MYSQL_DATABASE=pteroclass_db \
		-e MYSQL_ROOT_PASSWORD=lory030507 \
		-v mysql:/var/lib/mysql \
		jbergstroem/mariadb-alpine