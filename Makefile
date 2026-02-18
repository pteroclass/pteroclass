.PHONY: all start dev mysql
all: dev mysql
start:
	@docker desktop start || true
dev: start
	@bun nuxt dev
mysql: start
	@docker run \
		--name mysql \
		-it \
		--rm \
		-p 3306:3306 \
		-e MYSQL_DATABASE=pteroclass_db \
		-e MYSQL_ROOT_PASSWORD=lory030507 \
		-v mysql:/var/lib/mysql \
		jbergstroem/mariadb-alpine