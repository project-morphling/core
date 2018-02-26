import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import Layout from './layout/Layout.vue';

@Component({
    components: {
        Layout
    }
})
export default class extends Vue {

}