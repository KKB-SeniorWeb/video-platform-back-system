import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import table from './zh-CN/table';
import modal from "./zh-CN/modal";
import form from "./zh-CN/form";

export default {
  'navBar.lang': '语言',
  'layout.login.link.help': '帮助',
  'layout.login.link.privacy': '隐私',
  'layout.login.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...table,
  ...modal,
  ...form
};
