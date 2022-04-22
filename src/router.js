import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./components/pages/MainPage.vue";
import PinnedPage from "./components/pages/PinnedPage.vue";
import AuthModal from "./components/modals/AuthModal.vue";
import MyProfile from "./components/pages/MyProfile.vue";
import AdminPage from "./components/pages/AdminPage.vue";
import PostPeriodicalModal from "./components/periodicals/PostPeriodicalModal.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "admin",
    },
    {
      path: "/periodicals",
      name: "periodicals",
      component: MainPage,
      // children: [
      //   {
      //     path: "/periodicals/:id",
      //     component: PeriodicalDetails,
      //     props: true,
      //   },
      // ],
    },
    // {
    //   path: "/periodicals/:id",
    //   component: PeriodicalDetails,
    //   props: true,
    // },
    {
      path: "/pinned",
      name: "pinned",
      component: PinnedPage,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthModal,
    },
    {
      path: "/profile",
      name: "profile",
      component: MyProfile,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
      children: [
        {
          path: "/post-new",
          name: "post-new",
          component: PostPeriodicalModal,
        },
      ],
    },
  ],
});

export default router;
