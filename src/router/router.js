import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
       { 
         path: '/', 
         component: () => import(/*webpackChuhkName:"TeLoDeletreo"*/'@/modules/deletreo/pages/TeLoDeletreo')  
        },
       { 
         path: '/deletrearme', 
         component: () => import(/*webpackChuhkName:"Deletrearme"*/'@/modules/deletreo/pages/Deletrearme')  
       },
       {
        path: '/:pathMatch(.*)*',
        component: () => import(/*webpackChuhkName:"NoPageFound"*/'@/modules/shared/pages/NoPageFound')    
      },
  ]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })



export default router