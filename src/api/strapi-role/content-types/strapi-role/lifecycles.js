const { ApplicationError } = require("@strapi/utils").errors;
module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    const name = data?.name;
    const code = data?.code;
    let description;
    if (name && code) {
      if (code === "strapi-editor") {
        description =
          "Editors can manage and publish contents including those of other users.";
      }
      if (code === "strapi-author") {
        description = "Authors can manage the content they have created.";
      }

      const res = await strapi.db.connection.raw(
        `insert into admin_roles (name, code, description, created_at, updated_at) values ('${name}', '${code}', '${description}', NOW(), NOW())`
      );
    }
  },

  async afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
    const name = result?.name;
    const code = result?.code;
    if (name && code) {
      let rolePermissionIds;
      const getRoleId = await strapi.db.connection.raw(
        `select id, code from admin_roles where name='${name}'`
      );
      const roleId = getRoleId.rows[0].id;
      const code = getRoleId.rows[0].code;

      let genPermissionIds = await strapi.db.connection.raw(
        `select id from admin_permissions where action in ('plugin::upload.assets.download','plugin::upload.assets.create','plugin::upload.assets.copy-link')`
      );

      if (code === "strapi-author") {
        rolePermissionIds = await strapi.db.connection.raw(
          `select id from admin_permissions where action in ('plugin::upload.read', 'plugin::upload.assets.update') and conditions = '["admin::is-creator"]'`
        );
      }
      if (code === "strapi-editor") {
        rolePermissionIds = await strapi.db.connection.raw(
          `select id from admin_permissions where action in ('plugin::upload.read', 'plugin::upload.assets.update') and conditions != '["admin::is-creator"]'`
        );
      }
      const insertPermissions = await strapi.db.connection.raw(
        `insert into admin_permissions_role_links (permission_id, role_id) values (${rolePermissionIds.rows[0].id}, ${roleId}) , (${genPermissionIds.rows[0].id} , ${roleId}),  (${genPermissionIds.rows[1].id} , ${roleId}), (${rolePermissionIds.rows[1].id}, ${roleId}),  (${genPermissionIds.rows[2].id} , ${roleId})`
      );
    }
  },
};
