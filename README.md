![logo](https://www.percona.com/blog/wp-content/uploads/2015/01/computer-cpu-wallpaper.jpg)

# NodeJS Multi Core Demo
This application shows how you can use multiple cores of a machine with Node's cluster module. We used [Fastify](https://www.fastify.io/) for the server as it's much more low overhead than an Express server.

## How To Run
First install the dependencies with

```js
npm install
```

Then run the server. `index.js` is without cluster module and `cluster.js` is with cluster module.

```js
node cluster.js
```

This will spin up worker processes based on the number of CPU cores in your system. You should see something like this in console

```
server listening on 3000 and worker 247250
server listening on 3000 and worker 247247
server listening on 3000 and worker 247240
server listening on 3000 and worker 247241
server listening on 3000 and worker 247265
server listening on 3000 and worker 247276
server listening on 3000 and worker 247259
server listening on 3000 and worker 247277
server listening on 3000 and worker 247293
server listening on 3000 and worker 247284
server listening on 3000 and worker 247303
server listening on 3000 and worker 247300
```

You can load test the since process server vs cluster mode server and check the performance.

## Contribution
Want to contribute? Great!

To fix a bug or enhance an existing code, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

## [License](https://github.com/Joker666/NodeJS-MultiCore-Demo/blob/master/LICENSE.md)

MIT © [MD Ahad Hasan](https://github.com/joker666)