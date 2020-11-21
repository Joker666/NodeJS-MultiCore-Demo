// Require the framework and instantiate it
const os = require("os");
const cluster = require("cluster");
const fastify = require('fastify')({
    logger: false,
    disableRequestLogging: true
});

const clusterWorkerSize = os.cpus().length;

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

// Simulate crash
if (cluster.isWorker) {
    setTimeout(() => {
        process.exit(1) // death by random timeout
    }, Math.random() * 100000);
}

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
        console.log(`server listening on ${fastify.server.address().port} and worker ${process.pid}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

if (clusterWorkerSize > 1) {
    if (cluster.isMaster) {
        for (let i=0; i < clusterWorkerSize; i++) {
            cluster.fork();
        }

        cluster.on("exit", function(worker, code, signal) {
            console.log("Worker", worker.id, "has exited with signal", signal);
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                cluster.fork();
            }
        });
    } else {
        start();
    }
} else {
    start();
}
