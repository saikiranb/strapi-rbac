'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('rbac-hack')
      .service('myService')
      .getWelcomeMessage();
  },
});
