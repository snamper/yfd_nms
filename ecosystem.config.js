module.exports = {
  apps : [
    // First application
    {
      name      : 'ka_ecs',
      script    : '',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],
  deploy : {
    test : {
      user : 'root',
    //   host : '192.168.10.11',
      host : '192.168.10.103',
      ref  : 'origin/master',
      repo : 'https://github.com/thinkmix/yfd_nms.git',
      path : '/home/nginx/html/yfd_nms',
    //   path : '/root/nginx/html/yfd_nms',
      'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env test'
    },
    production : {
        user : 'root',
        host : '47.97.198.73',
        ref  : 'origin/master',
        repo : 'https://github.com/thinkmix/yfd_nms.git',
        path : '/usr/local/nginx/html/yfd_nms',
        'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env production'
      },
  
  }
};

