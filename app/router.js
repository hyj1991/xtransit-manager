'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, config: { secure } } = app;
  const {
    checkSign,
  } = app.middleware.security(secure, app);
  const {
    checkParams,
  } = app.middleware.params({}, app);

  // xprofiler-console
  router.post('/xprofiler/clients', checkSign, checkParams(['appId']), 'xprofiler.getClients');
  router.post('/xprofiler/agent_osinfo', checkSign, checkParams(['appId', 'agentId']), 'xprofiler.getAgentOsInfo');
  router.post('/xprofiler/agent_node_processes', checkSign, checkParams(['appId', 'agentId']), 'xprofiler.getAgentNodeProcesses');
  router.post('/xprofiler/check_process_status', checkSign, checkParams(['appId', 'agentId', 'pid']), 'xprofiler.checkProcessStatus');

  // xtransit-server
  router.post('/xtransit/app_secret', checkSign, checkParams(['appId']), 'xtransit.getAppSecret');
  router.post('/xtransit/update_client', checkSign, checkParams(['appId', 'agentId', 'clientId', 'server', 'timestamp']), 'xtransit.updateClient');
  router.post('/xtransit/remove_client', checkSign, checkParams(['appId', 'agentId', 'clientId']), 'xtransit.removeClient');
  router.post('/xtransit/log', checkSign, checkParams(['appId', 'agentId', 'log']), 'xtransit.handleLog');
};
