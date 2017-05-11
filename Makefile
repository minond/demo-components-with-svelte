SVELTE = node_modules/.bin/svelte

# build/components/%.js: src/components/%.html
# 	@$(SVELTE) compile --format iife -i $^ -o $@
#
# build: build/components.js build/components/*.js
# 	cat build/components/*.js > $<

.PHONY: build
build:
	@$(SVELTE) compile --format iife -i src/components/Input.html -o build/components/Input.js
	@$(SVELTE) compile --format iife -i src/components/Button.html -o build/components/Button.js
	@$(SVELTE) compile --format iife -i src/components/PaymentForm.html -o build/components/PaymentForm.js
	cat build/components/*.js > build/components.js

install: yarn.lock
	@yarn
