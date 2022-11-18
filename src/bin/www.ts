#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';
import createDebugMessages from 'debug';
import app from '../app';

const debug = createDebugMessages('todoapi:server');
debug.enabled = true;

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: number | string | undefined): number => {
	const normalPort = parseInt(String(val), 10) ?? 3000;

	if (isNaN(normalPort)) {
		// named pipe
		return Number(val);
	}

	if (normalPort >= 0) {
		// port number
		return normalPort;
	}

	return 3000;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: NodeJS.ErrnoException): void => {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			debug(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			debug(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = (): void => {
	const addr = server.address();
	if (addr == null) {
		server.close();
		return;
	}

	const bind = typeof addr === 'string' ? 'pipe ' + addr : `port ${addr.port}\n${addr.address}`;
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
	console.log('==============================\n');
	debug('Listening on ' + bind);
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
