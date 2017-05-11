SVELTE = node_modules/.bin/svelte

build/components/%.js: src/components/%.html
	@$(SVELTE) compile --format iife -i $^ -o $@

build: build/components.js build/components/*.js
	cat build/components/*.js > $<

install: yarn.lock
	@yarn
