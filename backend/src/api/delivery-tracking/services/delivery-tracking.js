'use strict';

/**
 * delivery-tracking service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::delivery-tracking.delivery-tracking');
