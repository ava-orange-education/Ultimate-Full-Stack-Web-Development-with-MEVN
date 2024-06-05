import { createRouter,  createWebHistory } from 'vue-router'
import LoginLayout from '../layouts/LoginLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import SignupComponentVue from '../components/SignupComponent.vue'
import SignInComponentVue from '../components/SigninComponent.vue'
import DetailsLayout from '../layouts/DetailsLayout.vue'

// 2. Define some routes
const routes: any[] = [
    {
        path: '',
        component: LoginLayout,
        children: [
            {
                path: 'signup',
                component: SignupComponentVue
            },
            {
                path: '',
                component: SignInComponentVue
            }
        ]
    },
    {
        path: '/dashboard',
        component: DashboardLayout
    },
    {
        path: '/:id/detail',
        component: DetailsLayout
    }
]
  
// 3. Create the router instance and pass the `routes` option
export const router = createRouter({
    // 4. Provide the history implementation to use.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})