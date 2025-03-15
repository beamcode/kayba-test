.PHONY: init clean prisma backend dev studio

init: 
	@echo "Initializing backend"
	@make clean
	@make backend
	@make prisma
	@make dev

clean:
	@echo "Cleaning up existing Prisma migrations and database files and node_modules"
		@if [ -d "node_modules" ]; then rm -rf node_modules; fi
		@if [ -f ".env" ]; then rm .env; fi
		@if [ -d "prisma/migrations" ]; then rm -rf prisma/migrations; fi
		@if [ -f "prisma/dev.db" ]; then rm prisma/dev.db; fi
		@if [ -f "prisma/dev.db-journal" ]; then rm prisma/dev.db-journal; fi
	@echo "Cleanup complete" 

prisma: 
	@echo "Initializing prisma and DB"
	@yarn prisma:generate && yarn prisma:migrate && yarn prisma:seed
	@echo "Prisma and DB initialized"

backend: 
	@echo "Initializing the project and installing dependencies"
	@cp .env.sample .env && yarn install
	@echo "Project initialized"

dev:
	@echo "Starting Prisma Studio and Server in parallel"
	@yarn prisma studio & yarn dev &
	@wait

studio:
	@echo "Starting Prisma Studio"
	@yarn prisma:studio