module.exports = {
  apps: [
    {
      name: 'server',
      script: './server.js',
      // instances: 0,
      // exec_mode: 'cluster',
      // wait_ready: true,
      // listen_timeout: 50000,
      // kill_timeout: 5000,
      interpreter: './node_modules/babel-cli/bin/babel-node.js',
      env: {
        PM2: 'PM2',
        NODE_ENV: 'development'
      },
      env_production: {
        PM2: 'PM2',
        NODE_ENV: 'production'
      }
    }
  ]
}

