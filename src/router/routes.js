import i18n from './../i18n';
import { api } from '../boot/axios';
import $store from '../store/index';

export const routes = [
  {
    path: '/',
    redirect: `/${i18n.locale}`,
  },
  {
    path: '/:lang',
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: 'account',
        component: () => import('../views/administrator/AdminPage.vue'),
        beforeEnter: (to, from, next) => {
          const user = $store.getters._getUserObject;
          if (user) {
            if (to.meta.accessList && to.meta.accessList.length) {
              next();
            } else {
              next();
            }
          } else {
            window.location = '/' + to.params.lang + '/login';
          }
        },
        children: [
          {
            path: '/',
            name: 'AccountMain',
            meta: { accessList: [] },
            component: () => import('../views/administrator/Main'),
          },
          {
            path: 'settings/',
            name: 'Settings',
            meta: { accessList: [] },
            component: () => import('../views/administrator/Settings'),
          },
          {
            path: 'info/',
            name: 'AccountInfo',
            meta: { accessList: ['read_user_info'] },
            component: () => import('../views/administrator/AccountInfo/index'),
          },
          {
            path: 'users/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'UserManagement',
                meta: { accessList: ['read_user'] },
                component: () => import('../views/administrator/UserManagement/index'),
              },
              {
                path: 'create',
                name: 'UserManagementAdd',
                meta: { accessList: ['change_user'] },
                component: () => import('../views/administrator/UserManagement/create'),
              },
              {
                path: ':id',
                name: 'UserManagementShow',
                meta: { accessList: ['read_user'] },
                component: () => import('../views/administrator/UserManagement/show'),
              },
              {
                path: ':id/edit',
                name: 'UserManagementEdit',
                meta: { accessList: ['change_user'] },
                component: () => import('../views/administrator/UserManagement/edit'),
              },
            ],
          },
          {
            path: 'roles/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'RoleManagement',
                meta: { accessList: ['change_role'] },
                component: () => import('../views/administrator/RoleManagement/index'),
              },
              {
                path: 'create',
                name: 'RoleManagementAdd',
                meta: { accessList: ['change_role'] },
                component: () => import('../views/administrator/RoleManagement/create'),
              },
              {
                path: ':id',
                name: 'RoleManagementShow',
                meta: { accessList: ['change_role'] },
                component: () => import('../views/administrator/RoleManagement/show'),
              },
              {
                path: ':id/edit',
                name: 'RoleManagementEdit',
                meta: { accessList: ['change_role'] },
                component: () => import('../views/administrator/RoleManagement/edit'),
              },
            ],
          },
          {
            path: 'request_registration/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'RequestRegistration',
                meta: { accessList: ['read_user'] },
                component: () => import('../views/administrator/RequestRegistration/index'),
              },
              {
                path: ':id/',
                name: 'requestRegistrationViews',
                meta: { accessList: ['change_user'] },
                component: () => import('../views/administrator/RequestRegistration/show'),
              },
            ],
          },
          {
            path: 'request_recovery/',
            name: 'RequestRecovery',
            meta: { accessList: ['change_user'] },
            component: () => import('../views/administrator/RequestRecovery/index'),
          },
          {
            path: 'monitoring/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'UserMonitoring1',
                meta: { accessList: ['read_actionlogs'] },
                component: () => import('../views/administrator/UserMonitoring/actions'),
              },
            ],
          },
          {
            path: 'monitoring-user/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'UserMonitoring2',
                meta: { accessList: ['read_actionlogs'] },
                component: () => import('../views/administrator/UserMonitoring/index'),
              },
              {
                path: ':id',
                name: 'UserMonitoringViews',
                meta: { accessList: ['read_actionlogs'] },
                component: () => import('../views/administrator/UserMonitoring/show'),
              },
            ],
          },
          {
            path: 'references/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'ReferenceManagement',
                meta: { accessList: ['read_catalog'] },
                component: () => import('../views/administrator/ReferenceManagement/index'),
              },
              {
                path: 'create',
                name: 'ReferenceManagementAdd',
                meta: { accessList: ['change_catalog'] },
                component: () => import('../views/administrator/ReferenceManagement/create'),
              },
              {
                path: ':id',
                name: 'ReferenceManagementShow',
                meta: { accessList: ['change_catalog'] },
                component: () => import('../views/administrator/ReferenceManagement/show'),
              },
              {
                path: ':id/edit',
                name: 'ReferenceManagementEdit',
                meta: { accessList: ['change_catalog'] },
                component: () => import('../views/administrator/ReferenceManagement/edit'),
              },
              {
                path: ':id/list',
                name: 'ReferenceManagementEntry',
                meta: { accessList: ['change_catalog'] },
                component: () => import('../views/administrator/ReferenceManagement/entry-index'),
              },
              {
                path: ':id/create',
                name: 'ReferenceManagementEntryAdd',
                meta: { accessList: ['change_catalog'] },
                component: () => import('../views/administrator/ReferenceManagement/entry-create'),
              },
              {
                path: ':id/entry/:entryId',
                name: 'ReferenceManagementEntryEdit',
                meta: { accessList: ['change_catalog'] },
                component: () => import('../views/administrator/ReferenceManagement/entry-edit'),
              },
            ],
          },
          {
            path: 'limits/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'LimitManagement1',
                meta: { accessList: ['read_limit'] },
                component: () => import('../views/administrator/LimitManagement/index'),
              },
              {
                path: 'create',
                name: 'LimitManagementAdd',
                meta: { accessList: ['change_limit'] },
                component: () => import('../views/administrator/LimitManagement/create'),
              },
              {
                path: ':id',
                name: 'LimitManagement2',
                meta: { accessList: ['read_limit'] },
                component: () => import('../views/administrator/LimitManagement/show'),
              },
              {
                path: ':id/:chapter',
                name: 'LimitManagement3',
                meta: { accessList: ['read_limit'] },
                component: () => import('../views/administrator/LimitManagement/item-index'),
                beforeEnter: (to, from, next) => {
                  //to, from, next
                  let roleAccesses = ['republic', 'local'].find((element) => {
                    return to.params.chapter.includes(element);
                  });
                  roleAccesses ? next() : (window.location = '/' + to.params.lang + '/404');
                },
              },
              {
                path: ':id/:chapter/create',
                name: 'LimitManagement5',
                meta: { accessList: ['change_limit'] },
                component: () => import('../views/administrator/LimitManagement/item-create'),
                beforeEnter: (to, from, next) => {
                  //to, from, next
                  let roleAccesses = ['republic', 'local'].find((element) => {
                    return to.params.chapter.includes(element);
                  });
                  roleAccesses ? next() : (window.location = '/' + to.params.lang + '/404');
                },
              },
              {
                path: ':id/:chapter/:itemId/edit',
                name: 'LimitManagement6',
                meta: { accessList: ['change_limit'] },
                component: () => import('../views/administrator/LimitManagement/item-edit'),
                beforeEnter: (to, from, next) => {
                  //to, from, next
                  let roleAccesses = ['republic', 'local'].find((element) => {
                    return to.params.chapter.includes(element);
                  });
                  roleAccesses ? next() : (window.location = '/' + to.params.lang + '/404');
                },
              },
              {
                path: ':id/:chapter/:itemId',
                name: 'LimitManagement',
                meta: { accessList: ['read_limit'] },
                component: () => import('../views/administrator/LimitManagement/item-show'),
                beforeEnter: (to, from, next) => {
                  //to, from, next
                  let roleAccesses = ['republic', 'local'].find((element) => {
                    return to.params.chapter.includes(element);
                  });
                  roleAccesses ? next() : (window.location = '/' + to.params.lang + '/404');
                },
              },
            ],
          },
          {
            path: 'quotas/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'QuotaManagement1',
                meta: { accessList: ['read_quota'] },
                component: () => import('../views/administrator/QuotaManagement/index'),
              },
              {
                path: 'create',
                name: 'QuotaManagement2',
                meta: { accessList: ['change_quota'] },
                component: () => import('../views/administrator/QuotaManagement/create'),
              },
              {
                path: ':id',
                name: 'QuotaManagement3',
                meta: { accessList: ['change_quota'] },
                component: () => import('../views/administrator/QuotaManagement/edit'),
              },
              {
                path: ':id/list',
                name: 'QuotaManagement4',
                meta: { accessList: ['read_quota'] },
                component: () => import('../views/administrator/QuotaManagement/item-index'),
              },
              {
                path: ':id/item/create',
                name: 'QuotaManagement55',
                meta: { accessList: ['change_quota'] },
                component: () => import('../views/administrator/QuotaManagement/item-create'),
              },
              {
                path: ':id/item/:itemId',
                name: 'QuotaManagement6',
                meta: { accessList: ['read_quota'] },
                component: () => import('../views/administrator/QuotaManagement/item-show'),
              },
              {
                path: ':id/item/:itemId/edit',
                name: 'QuotaManagement7',
                meta: { accessList: ['read_quota'] },
                component: () => import('../views/administrator/QuotaManagement/item-edit'),
              },
            ],
          },
          {
            path: 'quotas-reverse/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'QuotaReverseManagement1',
                meta: { accessList: ['read_quota-reverse'] },
                component: () => import('../views/administrator/QuotaReverseManagement/index'),
              },
              {
                path: ':id/list',
                name: 'QuotaReverseManagement2',
                meta: { accessList: ['read_quota-reverse'] },
                component: () => import('../views/administrator/QuotaReverseManagement/item-index'),
              },
              {
                path: ':id/item/create',
                name: 'QuotaReverseManagement3',
                meta: { accessList: ['read_quota-reverse'] },
                component: () =>
                  import('../views/administrator/QuotaReverseManagement/item-create'),
              },
              {
                path: ':id/item/:itemId',
                name: 'QuotaReverseManagement4',
                meta: { accessList: ['read_quota-reverse'] },
                component: () => import('../views/administrator/QuotaReverseManagement/item-show'),
              },
            ],
          },
          {
            path: 'documents/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'DocumentManagement1',
                meta: { accessList: ['read_document'] },
                component: () => import('../views/administrator/DocumentManagement/index'),
              },
              {
                path: ':id',
                name: 'DocumentManagement2',
                meta: { accessList: ['read_document'] },
                component: () => import('../views/administrator/DocumentManagement/show'),
              },
            ],
          },
          {
            path: 'documents-list/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'DocumentManagementSupervisor1',
                meta: { accessList: ['read_document_all'] },
                component: () =>
                  import('../views/administrator/DocumentManagementSupervisor/index'),
              },
              {
                path: ':userId/list',
                name: 'DocumentManagementSupervisor2',
                meta: { accessList: ['read_document_all'] },
                component: () =>
                  import('../views/administrator/DocumentManagementSupervisor/item-index'),
              },
            ],
          },
          {
            path: 'logs/',
            name: 'LogsManagement',
            meta: { accessList: [] },
            component: () => import('../views/administrator/LogsManagement/index'),
            children: [
              {
                path: 'grown/',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: 'GrownManagement1',
                    meta: { accessList: ['read_grown'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/GrownManagement/index'),
                  },
                  {
                    path: 'create',
                    name: 'GrownManagement2',
                    meta: { accessList: ['change_grown'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/GrownManagement/create'),
                  },
                  {
                    path: ':id',
                    name: 'GrownManagement3',
                    meta: { accessList: ['read_grown'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/GrownManagement/show'),
                  },
                ],
              },
              {
                path: 'purchased/',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: 'PurchasedManagement1',
                    meta: { accessList: ['read_purchased'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/PurchasedManagement/index'),
                  },
                  {
                    path: 'create',
                    name: 'PurchasedManagement2',
                    meta: { accessList: ['change_purchased'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/PurchasedManagement/create'),
                  },
                  {
                    path: ':id',
                    name: 'PurchasedManagement3',
                    meta: { accessList: ['read_purchased'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/PurchasedManagement/show'),
                  },
                ],
              },
              {
                path: 'implemented/',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: 'ImplementedManagement1',
                    meta: { accessList: ['read_implemented'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/ImplementedManagement/index'),
                  },
                  {
                    path: 'create',
                    name: 'ImplementedManagement2',
                    meta: { accessList: ['change_implemented'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/ImplementedManagement/create'),
                  },
                  {
                    path: ':id',
                    name: 'ImplementedManagement3',
                    meta: { accessList: ['read_implemented'] },
                    component: () =>
                      import('../views/administrator/LogsManagement/ImplementedManagement/show'),
                  },
                ],
              },
            ],
          },
          {
            path: 'trade/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'TradeManagement1',
                meta: { accessList: ['read_trade'] },
                component: () => import('../views/administrator/TradeManagement/index'),
              },
              {
                path: 'create',
                name: 'TradeManagement2',
                meta: { accessList: ['change_trade'] },
                component: () => import('../views/administrator/TradeManagement/create'),
              },
              {
                path: ':id',
                name: 'TradeManagement3',
                meta: { accessList: ['change_trade'] },
                props: {
                  statusPage: 'show',
                },
                component: () => import('../views/administrator/TradeManagement/create'),
              },
              {
                path: ':id/edit',
                name: 'TradeManagement3',
                meta: { accessList: ['change_trade'] },
                component: () => import('../views/administrator/TradeManagement/create'),
              },
            ],
          },
          {
            path: 'brigade',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'brigade-list',
                meta: {
                  accessList: ['read_trade', 'read_grown', 'read_purchased', 'read_implemented'],
                },
                component: () => import('../views/account/brigade/index'),
              },
              {
                path: 'create',
                name: 'brigade-create',
                meta: {
                  accessList: ['read_trade', 'read_grown', 'read_purchased', 'read_implemented'],
                },
                component: () => import('../views/account/brigade/item'),
              },
              {
                path: ':id',
                name: 'brigade-show',
                meta: {
                  accessList: ['read_trade', 'read_grown', 'read_purchased', 'read_implemented'],
                },
                props: {
                  statusPage: 'show',
                },
                component: () => import('../views/account/brigade/item'),
              },
              {
                path: ':id/edit',
                name: 'brigade-edit',
                meta: {
                  accessList: ['read_trade', 'read_grown', 'read_purchased', 'read_implemented'],
                },
                component: () => import('../views/account/brigade/item'),
              },
            ],
          },
          {
            path: 'fishing-permit',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'fishing-permit',
                meta: {
                  accessList: ['read_trade', 'read_grown', 'read_purchased', 'read_implemented'],
                },
                component: () => import('../views/account/fishing-permit/index'),
              },
              {
                path: ':id',
                name: 'fishing-permit-show',
                meta: {
                  accessList: ['read_trade', 'read_grown', 'read_purchased', 'read_implemented'],
                },
                props: {
                  statusPage: 'show',
                },
                component: () => import('../views/account/fishing-permit/item'),
              },
              {
                path: ':id/edit',
                name: 'fishing-permit-edit',
                meta: {
                  accessList: ['read_trade', 'read_grown', 'read_purchased', 'read_implemented'],
                },
                component: () => import('../views/account/fishing-permit/item'),
              },
            ],
          },
          {
            path: 'register/data',
            name: 'DataRegister',
            // meta: { accessList: ["change_trade"] },
            component: () => import('../views/administrator/DataRegister/index'),
          },
          {
            path: 'notifications',
            name: 'Notifications',
            // meta: { accessList: ["change_trade"] },
            component: () => import('../views/Notifications'),
          },
          {
            path: 'trade-list/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'TradeManagementSupervisor1',
                meta: { accessList: ['read_trade_all'] },
                component: () => import('../views/administrator/TradeManagementSupervisor/index'),
              },
              {
                path: ':userId/list',
                name: 'TradeManagementSupervisor2',
                meta: { accessList: ['read_trade_all'] },
                component: () =>
                  import('../views/administrator/TradeManagementSupervisor/item-index'),
              },
              {
                path: ':userId/list/:id',
                name: 'TradeManagementSupervisor3',
                meta: { accessList: ['read_trade_all'] },
                component: () =>
                  import('../views/administrator/TradeManagementSupervisor/item-show'),
              },
              {
                path: ':userId/user-profile',
                name: 'TradeManagementSupervisor4',
                meta: { accessList: ['read_trade_all'] },
                component: () =>
                  import('../views/administrator/TradeManagementSupervisor/user-profile'),
              },
            ],
          },
          {
            path: 'register-list/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'DataRegisterSupervisor1',
                meta: { accessList: ['read_data_register_all'] },
                component: () => import('../views/administrator/DataRegisterSupervisor/index'),
              },
              {
                path: ':userId/list',
                name: 'DataRegisterSupervisor2',
                meta: { accessList: ['read_data_register_all'] },
                component: () => import('../views/administrator/DataRegisterSupervisor/item-index'),
              },
            ],
          },
          {
            path: 'reporting-list/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'ReportingManagementSupervisor1',
                meta: { accessList: ['read_reporting_all'] },
                component: () =>
                  import('../views/administrator/ReportingManagementSupervisor/index'),
              },
              {
                path: ':itemId',
                name: 'ReportingManagementSupervisor2',
                meta: { accessList: ['read_reporting_all'] },
                component: () =>
                  import('../views/administrator/ReportingManagementSupervisor/list-index'),
              },
              {
                path: '1/user/:userId/list',
                name: 'ReportingManagementSupervisor3',
                meta: { accessList: ['read_reporting_all'] },
                component: () =>
                  import(
                    '../views/administrator/ReportingManagementSupervisor/list/px-1/item-list'
                  ),
              },
              {
                path: ':itemId/user/:userId/list',
                name: 'ReportingManagementSupervisor4',
                meta: { accessList: ['read_reporting_all'] },
                component: () =>
                  import('../views/administrator/ReportingManagementSupervisor/list/one/item-list'),
              },
            ],
          },
          {
            path: 'reporting-analytics/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'reporting-analytics-index',
                meta: { accessList: ['read_reporting_all'] },
                component: () => import(`../views/account/reporting/go/index.vue`),
              },
              {
                path: '1',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-1',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-1/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-1',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-1/subject`),
                  },
                ],
              },
              {
                path: '2',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-2',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-2/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-2',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-2/subject`),
                  },
                ],
              },
              {
                path: '3',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-3',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-3/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-3',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-3/subject`),
                  },
                ],
              },
              {
                path: '5',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-5',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-5/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-5',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-5/subject`),
                  },
                ],
              },
              {
                path: '6',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-6',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-6/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-6',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-6/subject`),
                  },
                ],
              },
              {
                path: '7',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-7',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-7/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-7',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-7/subject`),
                  },
                ],
              },
              {
                path: '8',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-8',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-8/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-8',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-8/subject`),
                  },
                ],
              },
              {
                path: '9',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region-9',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-9/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-9',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-9/subject`),
                  },
                ],
              },
              {
                path: '10',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    redirect: 'region',
                  },
                  {
                    path: 'region',
                    name: 'reporting-analytics-region',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-10/region`),
                  },
                  {
                    path: 'subject',
                    name: 'reporting-analytics-subject-10',
                    meta: { accessList: ['read_reporting_all'] },
                    component: () => import(`../views/account/reporting/go/px-10/subject`),
                  },
                ],
              },
            ],
          },
          {
            path: 'reporting',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'Reporting',
                meta: { accessList: ['read_reporting'] },
                component: () => import('../views/account/reporting/index'),
              },
              {
                path: '1-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '1-rh-list',
                    meta: { accessList: ['read_reporting-1rh'] },
                    component: () => import('../views/account/reporting/subject/1-rh/index'),
                  },
                  {
                    path: 'create',
                    name: '1-rh-create',
                    meta: { accessList: ['change_reporting-1rh'] },
                    props: {
                      statusPage: 'create',
                    },
                    component: () => import('../views/account/reporting/subject/1-rh/edit'),
                  },
                  {
                    path: ':id',
                    name: '1-rh-show',
                    meta: { accessList: ['change_reporting-1rh'] },
                    props: {
                      statusPage: 'show',
                    },
                    component: () => import('../views/account/reporting/subject/1-rh/view'),
                  },
                  {
                    path: ':id/edit',
                    name: '1-rh-edit',
                    meta: { accessList: ['change_reporting-1rh'] },
                    props: {
                      statusPage: 'edit',
                    },
                    component: () => import('../views/account/reporting/subject/1-rh/edit'),
                  },
                ],
              },
              {
                path: '2-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '2-rh-list',
                    meta: { accessList: ['read_reporting-2rh'] },
                    component: () => import(`../views/account/reporting/subject/2-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '2-rh-create',
                    meta: { accessList: ['change_reporting-2rh'] },
                    props: {
                      statusPage: 'create',
                    },
                    component: () => import(`../views/account/reporting/subject/2-rh/ReportPage2`),
                  },
                  {
                    path: ':id',
                    name: '2-rh-show',
                    meta: { accessList: ['change_reporting-2rh'] },
                    props: {
                      statusPage: 'show',
                    },
                    component: () => import(`../views/account/reporting/subject/2-rh/ReportPage2`),
                  },
                  {
                    path: ':id/edit',
                    name: '2-rh-edit',
                    meta: { accessList: ['change_reporting-2rh'] },
                    props: {
                      statusPage: 'edit',
                    },
                    component: () => import(`../views/account/reporting/subject/2-rh/ReportPage2`),
                  },
                ],
              },
              {
                path: '3-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '3-rh-list',
                    meta: { accessList: ['read_reporting-3rh'] },
                    component: () => import(`../views/account/reporting/subject/3-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '3-rh-create',
                    meta: { accessList: ['change_reporting-3rh'] },
                    props: {
                      statusPage: 'create',
                    },
                    component: () => import(`../views/account/reporting/subject/3-rh/ReportPage3`),
                  },
                  {
                    path: ':id',
                    name: '3-rh-show',
                    meta: { accessList: ['change_reporting-3rh'] },
                    props: {
                      statusPage: 'show',
                    },
                    component: () => import(`../views/account/reporting/subject/3-rh/ReportPage3`),
                  },
                  {
                    path: ':id/edit',
                    name: '3-rh-edit',
                    meta: { accessList: ['change_reporting-3rh'] },
                    props: {
                      statusPage: 'edit',
                    },
                    component: () => import(`../views/account/reporting/subject/3-rh/ReportPage3`),
                  },
                ],
              },
              {
                path: '7-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '7-rh-list',
                    meta: { accessList: ['read_reporting-7rh'] },
                    component: () => import(`../views/account/reporting/subject/7-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '7-rh-create',
                    meta: { accessList: ['change_reporting-7rh'] },
                    props: {
                      statusPage: 'create',
                    },
                    component: () => import(`../views/account/reporting/subject/7-rh/ReportPage7`),
                  },
                  {
                    path: ':id',
                    name: '7-rh-show',
                    meta: { accessList: ['change_reporting-7rh'] },
                    props: {
                      statusPage: 'show',
                    },
                    component: () => import(`../views/account/reporting/subject/7-rh/ReportPage7`),
                  },
                  {
                    path: ':id/edit',
                    name: '7-rh-edit',
                    meta: { accessList: ['change_reporting-7rh'] },
                    props: {
                      statusPage: 'edit',
                    },
                    component: () => import(`../views/account/reporting/subject/7-rh/ReportPage7`),
                  },
                ],
              },
              {
                path: '8-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '8-rh-list',
                    meta: { accessList: ['read_reporting-8rh'] },
                    component: () => import(`../views/account/reporting/subject/8-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '8-rh-create',
                    meta: { accessList: ['change_reporting-8rh'] },
                    props: {
                      statusPage: 'create',
                    },
                    component: () => import(`../views/account/reporting/subject/8-rh/ReportPage8`),
                  },
                  {
                    path: ':id',
                    name: '8-rh-show',
                    meta: { accessList: ['change_reporting-8rh'] },
                    props: {
                      statusPage: 'show',
                    },
                    component: () => import(`../views/account/reporting/subject/8-rh/ReportPage8`),
                  },
                  {
                    path: ':id/edit',
                    name: '8-rh-edit',
                    meta: { accessList: ['change_reporting-8rh'] },
                    props: {
                      statusPage: 'edit',
                    },
                    component: () => import(`../views/account/reporting/subject/8-rh/ReportPage8`),
                  },
                ],
              },
              {
                path: '9-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '9-rh-list',
                    meta: { accessList: ['read_reporting-9rh'] },
                    component: () => import(`../views/account/reporting/subject/9-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '9-rh-create',
                    meta: { accessList: ['change_reporting-9rh'] },
                    props: {
                      statusPage: 'create',
                    },
                    component: () => import(`../views/account/reporting/subject/9-rh/ReportPage9`),
                  },
                  {
                    path: ':id',
                    name: '9-rh-show',
                    meta: { accessList: ['change_reporting-9rh'] },
                    props: {
                      statusPage: 'show',
                    },
                    component: () => import(`../views/account/reporting/subject/9-rh/ReportPage9`),
                  },
                  {
                    path: ':id/edit',
                    name: '9-rh-edit',
                    meta: { accessList: ['change_reporting-9rh'] },
                    props: {
                      statusPage: 'edit',
                    },
                    component: () => import(`../views/account/reporting/subject/9-rh/ReportPage9`),
                  },
                ],
              },
              {
                path: '10-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '10-rh-list',
                    meta: { accessList: ['read_reporting-10rh'] },
                    component: () => import(`../views/account/reporting/subject/10-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '10-rh-create',
                    meta: { accessList: ['change_reporting-10rh'] },
                    props: {
                      statusPage: 'create',
                    },
                    component: () =>
                      import(`../views/account/reporting/subject/10-rh/ReportPage10`),
                  },
                  {
                    path: ':id',
                    name: '10-rh-show',
                    meta: { accessList: ['change_reporting-10rh'] },
                    props: {
                      statusPage: 'show',
                    },
                    component: () =>
                      import(`../views/account/reporting/subject/10-rh/ReportPage10`),
                  },
                  {
                    path: ':id/edit',
                    name: '10-rh-edit',
                    meta: { accessList: ['change_reporting-10rh'] },
                    props: {
                      statusPage: 'edit',
                    },
                    component: () =>
                      import(`../views/account/reporting/subject/10-rh/ReportPage10`),
                  },
                ],
              },
              {
                path: '1-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '1-tir-rh-index',
                    meta: { accessList: ['read_reporting-1-tir-rh'] },
                    component: () => import(`../views/account/reporting/tir/1-tir-rh/index`),
                  },
                  {
                    path: 'list',
                    name: '1-tir-rh-list',
                    component: {
                      render: (h) => h('router-view'),
                    },
                    children: [
                      {
                        path: ':id',
                        name: '1-tir-rh-archive',
                        meta: { accessList: ['change_reporting-1-tir-rh'] },
                        props: {
                          statusPage: 'list',
                        },

                        component: () => import(`../views/account/reporting/tir/1-tir-rh/list`),
                      },
                    ],
                  },
                  {
                    path: 'create',
                    name: '1-tir-rh-create',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'create',
                    },
                    component: () => import(`../views/account/reporting/tir/1-tir-rh/edit`),
                  },
                  {
                    path: ':id',
                    name: '1-tir-rh-show',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'show',
                    },
                    component: () => import(`../views/account/reporting/tir/1-tir-rh/edit`),
                  },
                  {
                    path: ':id/edit',
                    name: '1-tir-rh-edit',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'edit',
                    },
                    component: () => import(`../views/account/reporting/tir/1-tir-rh/edit`),
                  },
                ],
              },
              {
                path: '2-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '2-tir-rh-index',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/2-tir-rh/index`),
                  },
                  {
                    path: 'list',
                    name: '2-tir-rh-list',
                    component: {
                      render: (h) => h('router-view'),
                    },
                    children: [
                      {
                        path: ':id',
                        name: '2-tir-rh-archive',
                        meta: { accessList: ['change_reporting-2-tir-rh'] },
                        props: {
                          statusPage: 'archive',
                        },
                        component: () => import(`../views/account/reporting/tir/2-tir-rh/list`),
                      },
                    ],
                  },
                ],
              },
              {
                path: '3-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '3-tir-rh-index',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/3-tir-rh/index`),
                  },
                  {
                    path: 'list',
                    name: '3-tir-rh-list',
                    component: {
                      render: (h) => h('router-view'),
                    },
                    children: [
                      {
                        path: ':id',
                        name: '3-tir-rh-archive',
                        meta: { accessList: ['change_reporting-3-tir-rh'] },
                        props: {
                          statusPage: 'archive',
                        },
                        component: () => import(`../views/account/reporting/tir/3-tir-rh/list`),
                      },
                    ],
                  },
                ],
              },
              {
                path: '5-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '5-tir-rh-list',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/5-tir-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '5-tir-rh-create',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'create',
                    },
                    component: () =>
                      import(`../views/account/reporting/tir/5-tir-rh/ReportPageTir5`),
                  },
                  {
                    path: ':id',
                    name: '5-tir-rh-show',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'show',
                    },
                    component: () =>
                      import(`../views/account/reporting/tir/5-tir-rh/ReportPageTir5`),
                  },
                  {
                    path: ':id/edit',
                    name: '5-tir-rh-edit',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'edit',
                    },
                    component: () =>
                      import(`../views/account/reporting/tir/5-tir-rh/ReportPageTir5`),
                  },
                ],
              },
              {
                path: '6-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '6-tir-rh-list',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/6-tir-rh/index`),
                  },
                  {
                    path: 'create',
                    name: '6-tir-rh-create',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'create',
                    },
                    component: () =>
                      import(`../views/account/reporting/tir/6-tir-rh/ReportPageTir6`),
                  },
                  {
                    path: ':id',
                    name: '6-tir-rh-show',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'show',
                    },
                    component: () =>
                      import(`../views/account/reporting/tir/6-tir-rh/ReportPageTir6`),
                  },
                  {
                    path: ':id/edit',
                    name: '6-tir-rh-edit',
                    //meta: {accessList: ['change_reporting-5rh']},
                    props: {
                      statusPage: 'edit',
                    },
                    component: () =>
                      import(`../views/account/reporting/tir/6-tir-rh/ReportPageTir6`),
                  },
                ],
              },
              {
                path: '7-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '7-tir-rh-index',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/7-tir-rh/index`),
                  },
                  {
                    path: 'list',
                    name: '7-tir-rh-list',
                    component: {
                      render: (h) => h('router-view'),
                    },
                    children: [
                      {
                        path: ':id',
                        name: '7-tir-rh-archive',
                        meta: { accessList: ['change_reporting-7-tir-rh'] },
                        props: {
                          statusPage: 'archive',
                        },
                        component: () => import(`../views/account/reporting/tir/7-tir-rh/list`),
                      },
                    ],
                  },
                ],
              },
              {
                path: '8-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '8-tir-rh-index',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/8-tir-rh/index`),
                  },
                  {
                    path: 'list',
                    name: '8-tir-rh-list',
                    component: {
                      render: (h) => h('router-view'),
                    },
                    children: [
                      {
                        path: ':id',
                        name: '8-tir-rh-archive',
                        meta: { accessList: ['change_reporting-8-tir-rh'] },
                        props: {
                          statusPage: 'archive',
                        },
                        component: () => import(`../views/account/reporting/tir/8-tir-rh/list`),
                      },
                    ],
                  },
                ],
              },
              {
                path: '9-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '9-tir-rh-index',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/9-tir-rh/index`),
                  },
                  {
                    path: 'list',
                    name: '9-tir-rh-list',
                    component: {
                      render: (h) => h('router-view'),
                    },
                    children: [
                      {
                        path: ':id',
                        name: '9-tir-rh-archive',
                        meta: { accessList: ['change_reporting-9-tir-rh'] },
                        props: {
                          statusPage: 'archive',
                        },
                        component: () => import(`../views/account/reporting/tir/9-tir-rh/list`),
                      },
                    ],
                  },
                ],
              },
              {
                path: '10-tir-rh',
                component: {
                  render: (h) => h('router-view'),
                },
                children: [
                  {
                    path: '/',
                    name: '10-tir-rh-index',
                    //meta: {accessList: ['read_reporting-5rh']},
                    component: () => import(`../views/account/reporting/tir/10-tir-rh/index`),
                  },
                  {
                    path: 'list',
                    name: '10-tir-rh-list',
                    component: {
                      render: (h) => h('router-view'),
                    },
                    children: [
                      {
                        path: ':id',
                        name: '10-tir-rh-archive',
                        meta: { accessList: ['change_reporting-10-tir-rh'] },
                        props: {
                          statusPage: 'archive',
                        },
                        component: () => import(`../views/account/reporting/tir/10-tir-rh/list`),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: 'power-reservoir/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'PowerReservoirManagement1',
                meta: { accessList: ['read_power'] },
                component: () => import('../views/administrator/PowerReservoirManagement/index'),
              },
              {
                path: 'create',
                name: 'PowerReservoirManagement2',
                meta: { accessList: ['change_power'] },
                component: () => import('../views/administrator/PowerReservoirManagement/create'),
              },
              {
                path: ':id',
                name: 'PowerReservoirManagement3',
                meta: { accessList: ['read_power'] },
                component: () => import('../views/administrator/PowerReservoirManagement/show'),
              },
              {
                path: ':id/edit',
                name: 'PowerReservoirManagement4',
                meta: { accessList: ['change_power'] },
                component: () => import('../views/administrator/PowerReservoirManagement/edit'),
              },
            ],
          },
          {
            path: 'contest/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'ContestManagement1',
                meta: { accessList: ['read_contest'] },
                component: () => import('../views/administrator/ContestManagement/index'),
              },
              {
                path: 'create',
                name: 'ContestManagement2',
                meta: { accessList: ['change_contest'] },
                component: () => import('../views/administrator/ContestManagement/create'),
              },
              {
                path: ':id',
                name: 'ContestManagement3',
                meta: { accessList: ['read_contest'] },
                component: () => import('../views/administrator/ContestManagement/show'),
              },
            ],
          },
          {
            path: 'permission/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'PermissionManagement1',
                meta: { accessList: ['read_permission'] },
                component: () => import('../views/administrator/PermissionManagement/index'),
              },
              {
                path: ':userId',
                name: 'PermissionManagement2',
                meta: { accessList: ['read_permission'] },
                component: () => import('../views/administrator/PermissionManagement/show'),
              },
            ],
          },
          {
            path: 'permission-list/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'PermissionCreateManagement1',
                meta: { accessList: ['create_permission'] },
                component: () => import('../views/administrator/PermissionCreateManagement/index'),
              },
              {
                path: 'create',
                name: 'PermissionCreateManagement2',
                meta: { accessList: ['create_permission'] },
                component: () => import('../views/administrator/PermissionCreateManagement/create'),
              },
              {
                path: ':id',
                name: 'PermissionCreateManagement3',
                meta: { accessList: ['create_permission'] },
                component: () => import('../views/administrator/PermissionCreateManagement/show'),
              },
            ],
          },
          {
            path: 'fish-book/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'FishBookManagement1',
                meta: { accessList: ['read_fish_book'] },
                component: () => import('../views/administrator/FishBookManagement/index'),
              },
              {
                path: 'create',
                name: 'FishBookManagement2',
                meta: { accessList: ['change_fish_book'] },
                component: () => import('../views/administrator/FishBookManagement/create'),
              },
              {
                path: ':id',
                name: 'FishBookManagement3',
                meta: { accessList: ['read_fish_book'] },
                component: () => import('../views/administrator/FishBookManagement/show'),
              },
              {
                path: ':id/edit',
                name: 'FishBookManagement4',
                meta: { accessList: ['change_fish_book'] },
                component: () => import('../views/administrator/FishBookManagement/edit'),
              },
            ],
          },
          {
            path: 'reference-log/',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                path: '/',
                name: 'ReferenceLogManagement1',
                meta: { accessList: ['read_reference'] },
                component: () => import('../views/administrator/ReferenceLogManagement/index'),
              },
              {
                path: ':userId',
                name: 'ReferenceLogManagement2',
                meta: { accessList: ['read_reference'] },
                component: () => import('../views/administrator/ReferenceLogManagement/show'),
              },
            ],
          },
          {
            path: 'fine/',
            name: 'FineManagement',
            meta: { accessList: ['read_fine'] },
            component: () => import('../views/administrator/FineManagement/index'),
          },
          {
            path: 'prescription/',
            name: 'PrescriptionManagement',
            meta: { accessList: ['read_fine'] },
            component: () => import('../views/administrator/FineManagement/prescription'),
          },
          {
            path: 'mastering/',
            name: 'MasteringManagement',
            meta: { accessList: ['read_mastering'] },
            component: () => import('../views/administrator/MasteringManagement/index'),
          },
          {
            path: 'reserve-fund/',
            name: 'ReserveFundManagement',
            meta: { accessList: ['read_reserve_fund'] },
            component: () => import('../views/administrator/ReserveFundManagement/index'),
          },
          {
            path: 'news',
            name: 'News',
            meta: { accessList: [] },
            component: () => import('../views/administrator/News'),
          },
          {
            path: 'contacts',
            name: 'Contacts',
            meta: { accessList: [] },
            component: () => import('../views/administrator/Contacts'),
          },
          {
            path: 'video',
            name: 'Video',
            meta: { accessList: [] },
            component: () => import('../views/administrator/UploadVideoContent'),
          },
          {
            path: 'analytics/',
            name: 'AnalyticManagement',
            meta: { accessList: ['read_analytic'] },
            component: () => import('../views/administrator/AnalyticManagement/index'),
          },
        ],
      },

      {
        path: '',
        component: () => import('../views/Index.vue'),
        children: [
          {
            path: '/',
            name: 'Home',
            component: () => import('../views/Main'),
          },
          {
            path: 'news',
            component: () => import('../views/News/AllNews.vue'),
          },
          {
            path: 'description/:id',
            component: () => import('../views/News/NewsDescription.vue'),
          },
          {
            path: 'contact',
            component: () => import('../views/Contact/index.vue'),
          },
          {
            path: 'sitemap',
            component: () => import('../views/Sitemap/index.vue'),
          },
        ],
      },

      {
        path: '',
        component: () => import('../views/IndexAuth.vue'),
        children: [
          {
            path: 'login',
            name: 'Auth',
            component: () => import('../views/Auth.vue'),
          },
          {
            path: 'recovery',
            name: 'Recovery',
            component: () => import('../views/AuthRecovery.vue'),
          },
          {
            path: 'password/reset/:token',
            name: 'ResetPassword1',
            component: () => import('../views/AuthPassword.vue'),
          },
          {
            path: 'password/auth/:token',
            name: 'ResetPassword2',
            component: () => import('../views/Auth2Password.vue'),
          },
          {
            path: 'registration',
            name: 'Registration',
            component: () => import('../views/Registration.vue'),
          },
          {
            path: '404',
            name: '404',
            component: () => import('../views/NotFound.vue'),
          },
          {
            path: '*',
            redirect: '404',
          },
        ],
      },
    ],
  },
];
