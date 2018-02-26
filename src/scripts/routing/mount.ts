import Vue, {Component} from 'vue';
import VueRouter from 'vue-router';

import {routes} from './routes';
import {RoutingHooks} from './hooks';

export function mount(element: string | HTMLElement, component: Component): void {
    const router = createRouter();

    // Mount router to page
    new Vue({
        el: element,
        router,
        render: h => h(component)
    });
}

function createRouter() {
    // Create router
    const router = new VueRouter({
        routes,
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            // Simulate anchor scroll
            if (to.hash && document.getElementById(to.hash.substring(1))) {
                return {
                    selector: to.hash
                };
            }

            // Otherwise go to top of page
            return {x: 0, y: 0};
        }
    });

    // Register hooks
    RoutingHooks.init(router);

    return router;
}
