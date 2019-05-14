import Vue from 'vue';
import Router from 'vue-router';
//import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Coupon from '@/components/pages/Coupon';
import OrderList from '@/components/pages/OrderList';

import Watch from '@/components/Watch';
import WatchIndex from '@/components/WatchIndex';
import WatchProducts from '@/components/WatchProducts';
import WatchCart from '@/components/WatchCart';
import WatchCheckout from '@/components/WatchCheckout';
import WatchProduct from '@/components/WatchProduct';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },
    //{
    //  path: '/',
    //  name: 'HelloWorld',
    //  component: HelloWorld,
    //  meta: { requiresAuth: true },
    //},
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
        {
          path: 'orderlist',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ],
    },
    {
      path: '/',
      name: 'Watch',
      component: Watch,
      children: [
        {
          path: '/',
          name: 'WatchIndex',
          component: WatchIndex,
        },
        {
          path: 'watchproducts',
          name: 'WatchProducts',
          component: WatchProducts,
        },
        {
          path: 'watchcart',
          name: 'WatchCart',
          component: WatchCart,
        },
        {
          path: 'watchcheckout/:orderId',
          name: 'WatchCheckout',
          component: WatchCheckout,
        },
        {
          path: 'watchproduct/:id',
          name: 'WatchProduct',
          component: WatchProduct,
        },
      ],
    },
  ]
})
