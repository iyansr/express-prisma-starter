module.exports = {
  apps: [
    {
      name: 'myapp-api',
      script: 'yarn start:api',
      time: true,
      instances: 1,
      exec_mode : "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        PORT: 3000,
        DATABASE_ADDRESS: process.env.DATABASE_ADDRESS
      },
    },
  ],
  deploy: {
    production: {
      user: 'iyansr',
      host: '103.175.216.123',
      key: 'deploy.key',
      ref: 'origin/main',
      repo: 'https://github.com/username/myapp',
      path: '/home/iyansr/express-app',
      'post-deploy':
        'yarn install && yarn build && pm2 startOrRestart ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
        DATABASE_ADDRESS: process.env.DATABASE_ADDRESS
      },
    },
  },
}