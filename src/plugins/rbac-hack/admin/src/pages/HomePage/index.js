/*
 *
 * HomePage
 *
 */

import React from 'react';
import { Layout, BaseHeaderLayout, ContentLayout} from '@strapi/design-system/Layout'
import RbacSelect from '../../components/RbacSelect';
// import PropTypes from 'prop-types';

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout 
        title="RBAC Hack"
        subtitle="Add Editor and Author roles"
        as="h2"
      />
      <ContentLayout>
        <RbacSelect />
      </ContentLayout>
      </Layout>

  );
};

export default HomePage;
