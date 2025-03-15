.PHONY: backend frontend

backend:
	@cd backend && make init 

frontend:
	@cd frontend && make init

all:
	@cd backend && make init
	@cd frontend && make init
