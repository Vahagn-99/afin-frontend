import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Bill from "./../views/Bill.vue";
import Rating from "./../views/Rating.vue";
import Bonus from "./../views/Bonus.vue";
import Login from "./../views/Login.vue";
import SideMenu from "./../menu/SideMenu.vue";
import ClosedBillTab from "./../components/bill/ClosedBillTab.vue";
import OpenedBillTab from "./../components/bill/OpenedBillTab.vue";
import HistoryTab from "./../components/bill/HistoryTab.vue";
import BillTab from "./../components/bill/BillTab.vue";
import HistoryItemTable from "./../components/bill/HistoryItemTable.vue";
import {useProfileStore} from "./../stores/profile";
import {checkParameter} from "./../helper/function.js";

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      name: 'menu',
      component: SideMenu,
      children: [
        {
          path: '',
          redirect: '/bill',
        },
        {
          path: '',
          name: 'home',
          component: Bill,
          children: [
            {
              path: '/bill',
              name: 'bill',
              component: BillTab
            },
            {
              path: 'opened',
              name: 'opened',
              component: OpenedBillTab
            },
            {
              path: 'closed',
              name: 'closed',
              component: ClosedBillTab
            },
            {
              path: 'history',
              name: 'history',
              component: HistoryTab
            },
          ],
        },
        {
          path: 'history/:id',
          name: 'historyItem',
          component: HistoryItemTable
        },
        {
          path: 'rating',
          name: 'rating',
          component: Rating
        },
        {
          path: 'bonus',
          name: 'bonus',
          component: Bonus
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login'];

  const authRequired = !(publicPages.includes(to.path));
  const profileStore = useProfileStore();
  const authorized = profileStore.authorized();
  if (authRequired && !authorized && !checkParameter()) {
    await router.push({name: 'login'});
  }

});


export default router
