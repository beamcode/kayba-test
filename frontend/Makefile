.Phony: init clean

init: 
	@echo "Initializing frontend"
	@cp .env.example .env
	@make clean
	@yarn && yarn dev

clean:
	@echo "Cleaning up node_modules"
		@if [ -d "node_modules" ]; then rm -rf node_modules; fi
		@if [ -f ".env" ]; then rm .env; fi
	@echo "Cleanup complete" 