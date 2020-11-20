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
})

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

        cluster.on("exit", function(worker) {
            console.log("Worker", worker.id, " has exited.")
        })
    } else {
        start();
    }
} else {
    start();
}
