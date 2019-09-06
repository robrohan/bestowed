
.PHONY: build test

usage:
	@echo ""
	@echo "Make tasks:"
	@echo ""
	@echo "	build - compile the app"
	@echo "	test - run the tests"
	@echo "	publish - push to s3"
	@echo ""

build:
	rm -rf dist
	npm run build
	mv dist/bestowed.js dist/bestowed.min.js
	cp src/bestowed.css dist/bestowed.min.css
	cp -R src/themes dist/
	cp example/example.html dist/example.html

test:
	npm run test


publish:
	aws s3 sync --cache-control max-age=604800 dist s3://cdn.robrohan.com/bestowed
