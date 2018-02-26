import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import Header from './header/Header.vue';

@Component({
    components: {
        Header
    }
})
export default class extends Vue {

}