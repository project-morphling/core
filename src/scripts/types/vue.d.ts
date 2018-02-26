// Vue files fix
declare module '*.vue' {
    import 'vue-router';
    import Vue from 'vue';
    export default class extends Vue {
    }
}