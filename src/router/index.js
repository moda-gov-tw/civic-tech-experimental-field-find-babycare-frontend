import { createRouter, createWebHistory } from 'vue-router'
import { i18n, checkDefaultLocale, getAvailableLocales } from '../i18n'
import { useMenuStore } from '../stores/menu.js';
import Storage from '../lib/Storage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      children: [
        {
          path: '',
          name: 'home',
          redirect: { name: 'map' },
        },
        // map
        {
          path: 'map',
          name: 'map',
          component: () => import('../views/MapView.vue'),
        },
        // 404
        {
          path: ':pathMatch(.*)*',
          name: '404',
          component: () => import('../views/404View.vue'),
        },
        // 公托候補名單頁
        {
          path: 'waitlist/:daycareID?',
          name: 'waitlist',
          props: true,
          component: () => import('../views/WaitlistView.vue'),
        },
        // 模板及範本
        {
          path: 'documents',
          name: 'documents',
          component: () => import('../views/documents/DocumentsView.vue'),
          children: [
            {
              path: 'templates',
              component: () => import('../views/documents/TemplatesView.vue'),
            },
            {
              path: 'samples',
              component: () => import('../views/documents/SamplesView.vue'),
            },
          ],
        },
        // 登入
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
        // 註冊
        {
          path: 'signup',
          name: 'signup',
          redirect: { name: 'signup.home' },
          children: [
            {
              path: '',
              name: 'signup.home',
              component: () => import('../views/signup/SignupHome.vue'),
            },
            {
              path: 'verification-sent',
              name: 'signup.verificationSent',
              component: () => import('../views/signup/VerificationSentView.vue'),
            },
            {
              path: 'success',
              name: 'signup.success',
              component: () => import('../views/signup/SuccessView.vue'),
            },
          ],
        },
        // 忘記密碼
        {
          path: 'forgot-password',
          name: 'forgotPassword',
          redirect: { name: 'forgotPassword.home' },
          children: [
            {
              path: '',
              name: 'forgotPassword.home',
              component: () => import('../views/forgotPassword/ForgotPasswordView.vue'),
            },
            {
              path: 'link-sent',
              name: 'forgotPassword.lintSent',
              component: () => import('../views/forgotPassword/LinkSentView.vue'),
            },
            {
              path: 'reset',
              name: 'forgotPassword.reset',
              component: () => import('../views/forgotPassword/ResetView.vue'),
            },
            {
              path: 'success',
              name: 'forgotPassword.success',
              component: () => import('../views/forgotPassword/SuccessView.vue'),
            },
          ],
        },
        // 我的報名
        {
          path: 'my-applications',
          name: 'myApplications',
          component: () => import('../views/myApplications/MyApplicationsView.vue'),
            children: [
              {
                path: 'drafts',
                name: 'myApplications.drafts',
                component: () => import('../views/myApplications/DraftsView.vue'),
              },
              {
                path: 'submitted',
                name: 'myApplications.submitted',
                component: () => import('../views/myApplications/SubmittedView.vue'),
              },
            ],
        },
        // 開始新的報名
        {
          path: 'apply',
          name: 'apply',
          component: () => import('../views/apply/ApplyView.vue'),
            children: [
              {
                path: 'step-0',
                name: 'apply.step0',
                component: () => import('../views/apply/Step0View.vue'),
              },
              {
                path: 'step-1',
                name: 'apply.step1',
                component: () => import('../views/apply/Step1View.vue'),
              },
              {
                path: 'step-2',
                name: 'apply.step2',
                component: () => import('../views/apply/Step2View.vue'),
              },
              {
                path: 'step-3',
                name: 'apply.step3',
                component: () => import('../views/apply/Step3View.vue'),
              },
              {
                path: 'step-4',
                name: 'apply.step4',
                component: () => import('../views/apply/Step4View.vue'),
              },
              {
                path: 'confirmation',
                name: 'apply.confirmation',
                component: () => import('../views/apply/ConfirmationView.vue'),
              },
            ],
        },
        // 報名管理
        {
          path: 'applications',
          name: 'applicationsBase',
          component: () => import('../views/applications/BaseView.vue'),
          children: [
            // 報名審查
            {
              path: 'approval',
              name: 'applications.approval',
              component: () => import('../views/applications/ApprovalView.vue'),
            },
            // 候補名單
            {
              path: 'waitlist',
              name: 'applications.waitlist',
              component: () => import('../views/applications/WaitlistView.vue'),
            },
            // 移除名單
            {
              path: 'removed',
              name: 'applications.removed',
              component: () => import('../views/applications/RemovedView.vue'),
            },
          ],
        },
        // 報名管理：詳細頁
        {
          path: 'applications/:applicationID',
          name: 'applications.detail',
          props: true,
          component: () => import('../views/applications/DetailView.vue'),
          children: [
            {
              path: 'enroll',
              name: 'applications.detail.enroll',
              component: () => import('../views/applications/EnrollView.vue'),
            },
            {
              path: 'forfeit',
              name: 'applications.detail.forfeit',
              component: () => import('../views/applications/ForfeitView.vue'),
            },
            {
              path: 'forfeit-success',
              name: 'applications.detail.forfeitSuccess',
              component: () => import('../views/applications/ForfeitSuccessView.vue'),
            },
            // 填寫報到意願
            {
              path: 'register',
              name: 'applications.detail.register',
              component: () => import('../views/applications/register/RegisterView.vue'),
              children: [
                // 健康狀況
                {
                  path: 'step-1',
                  name: 'applications.detail.register.step1',
                  component: () => import('../views/applications/register/Step1View.vue'),
                },
                // 資料確認
                {
                  path: 'step-2',
                  name: 'applications.detail.register.step2',
                  component: () => import('../views/applications/register/Step2View.vue'),
                },
                // 注意事項
                {
                  path: 'step-3',
                  name: 'applications.detail.register.step3',
                  component: () => import('../views/applications/register/Step3View.vue'),
                },
                // 報到成功
                {
                  path: 'confirmation',
                  name: 'applications.detail.register.confirmation',
                  component: () => import('../views/applications/register/ConfirmationView.vue'),
                },
              ],
            },
          ],
        },
        // 入退托管理
        {
          path: 'enrollment',
          name: 'enrollmentBase',
          component: () => import('../views/enrollment/BaseView.vue'),
          children: [
            // 報到確認 tab
            {
              path: 'approval',
              name: 'enrollment.approval',
              component: () => import('../views/enrollment/ApprovalView.vue'),
            },
            // 入托名單 tab
            {
              path: 'enrolled',
              name: 'enrollment.enrolled',
              component: () => import('../views/enrollment/EnrolledView.vue'),
            },
            // 放棄入托名單 tab
            {
              path: 'forfeit',
              name: 'enrollment.forfeit',
              component: () => import('../views/enrollment/ForfeitView.vue'),
            },
            // 退托名單 tab
            {
              path: 'graduated',
              name: 'enrollment.graduated',
              component: () => import('../views/enrollment/GraduatedView.vue'),
            },
          ],
        },
        // 入退托管理：詳細頁
        {
          path: 'enrollment/:enrollmentID',
          name: 'enrollmentDetail',
          props: true,
          component: () => import('../views/enrollment/DetailView.vue'),
        },

        // 公托管理
        {
          path: 'daycares/:daycareID?',
          name: 'daycares',
          props: true,
          component: () => import('../views/daycares/DaycaresView.vue'),
          children: [
            {
              path: 'info',
              name: 'daycares.info',
              component: () => import('../views/daycares/InfoView.vue'),
            },
            {
              path: 'documents',
              name: 'daycares.documents',
              component: () => import('../views/daycares/DocumentsView.vue'),
            },
            {
              path: 'permissions',
              name: 'daycares.permissions',
              component: () => import('../views/daycares/PermissionsView.vue'),
            },
          ],
        },
        // 平台權限
        {
          path: 'system-setting',
          name: 'systemSetting',
          component: () => import('../views/SystemSettingView.vue'),
        },
        // 帳號設定
        {
          path: 'account-setting',
          name: 'accountSetting',
          component: () => import('../views/AccountSettingView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(() => {
  const store = useMenuStore();
  const { closeMobileMenu } = store;
  closeMobileMenu();
});

router.beforeEach((to, from ,next) => {
  const cacheKey = 'i18n-prefer';
  const getLocale = () => {
    let locale = to.query?.locale || Storage.getWithExpiry(cacheKey) || to.params?.locale;
    if(!getAvailableLocales().includes(locale)) {
      locale = checkDefaultLocale();
    }
    return locale;
  }
  const locale = getLocale();
  i18n.global.locale.value = locale;

  if(to.query?.locale) {
    Storage.setWithExpiry({
      key: cacheKey,
      value: locale,
      ttl: Infinity,
    });
  }

  if(
    !getAvailableLocales().includes(to.params?.locale)
    || to.params?.locale !== locale
  ) {
    delete to.query.locale;
    router.push({
      name: to.name,
      params: {
        ...to.params,
        locale,
      },
      query: {
        ...to.query,
      }
    });
  }
  next();
});

export default router;
