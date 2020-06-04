// https://umijs.org/config/
import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const {REACT_APP_ENV} = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: 'login',
          component: '../layouts/UserLayout',
          routes: [
            {
              name: '登录页',
              path: 'login',
              component: './UserLogin',
            },
            {
              name: '注册页',
              path: 'register',
              component: './UserRegister',
              routes: [
                {
                  name: '注册结果页',
                  path: 'result',
                  component: './UserRegisterResult',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: 'video',
              icon: 'video-camera',
              path: 'video',
              routes: [
                {
                  name: 'video',
                  path: 'management',
                  component: './Video/MainPage',
                },
                {
                  name: 'add',
                  path: 'add',
                  component: './Video/addVideo',
                },
              ],
            },
            {
              name: 'user',
              icon: 'user',
              path: 'user',
              routes: [
                {
                  name: 'user',
                  path: 'management',
                  component: './User/MainPage',
                }
              ]
            },
            {
              name: 'course',
              icon: 'bulb',
              path: 'course',
              routes: [
                {
                  name: 'classify',
                  path: 'classify',
                  component: './Course/Classify',
                },
                {
                  name: 'management',
                  path: 'management',
                  component: './Course/MainPage',
                }
              ]
            },
            {
              name: 'topic',
              icon: 'book',
              path: 'topic',
              routes: [
                {
                  name: 'management',
                  path: 'management',
                  component: './Topic/MainPage'
                }
              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
