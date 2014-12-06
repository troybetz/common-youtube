BIN = node_modules/.bin

test/bundle.js: test/*-test.js
	$(BIN)/watchify -p proxyquireify/plugin $^ -o $@

example/bundle.js: example/example.js
	$(BIN)/browserify $^ > $@
