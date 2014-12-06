BIN = node_modules/.bin

test/bundle.js: test/*-test.js
	$(BIN)/watchify -p proxyquireify/plugin $^ -o $@