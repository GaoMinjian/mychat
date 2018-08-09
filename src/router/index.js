import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import message from '../page/message'
import find from '../page/find'

import me from '../page/me'
import personalinfo from '../page/personalinfo'
import changeheadshow from '../page/changeheadshow'
import setting from '../page/setting'
import about from '../page/about'

import addressbook from '../page/addressbook'
import login from '../page/login'
import register from '../page/register'
import conversation from '../page/conversation'
import groupchat from '../page/groupchat'
import unfinished from '../page/unfinished'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: login
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/find',
      name: 'find',
      component: find
    },
    {
      path: '/me',
      name: 'me',
      component: me
    },
    {
      path: '/personalinfo',
      name: 'personalinfo',
      component: personalinfo
    },
    {
      path: '/changeheadshow',
      name: 'changeheadshow',
      component: changeheadshow
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/addressbook',
      name: 'addressbook',
      component: addressbook
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/conversation',
      name: 'conversation',
      component: conversation
    },
    {
      path: '/groupchat',
      name: 'groupchat',
      component: groupchat
    },
    {
      path: '/unfinished',
      name: 'unfinished',
      component: unfinished
    }
  ]
})
