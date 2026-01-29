.PHONY: all dev start mysql cleanup
all: dev start mysql cleanup
dev:
	@bun dev
start:
	@docker desktop start || true
mysql:
	@docker run \
		--name mysql \
		-it \
		--init \
		--rm \
		-p 3306:3306 \
		-e MYSQL_USER_DB=pteroclass_db \
		-e MYSQL_ROOT_PWD=lory030507 \
		-v mysql:/var/lib/mysql \
		leafney/alpine-mariadb
cleanup:
	@trap 'docker stop mysql' SIGINT