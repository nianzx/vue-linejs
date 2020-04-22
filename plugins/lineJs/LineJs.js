import LineJs from './LineJs.vue';

let map = {};
export default {
    install: function (Vue, options) {
        const LineJsPlugin = Vue.extend(LineJs);
        let lineJs = {
            drawLine: function (target, data) {
                let color = data.color || '#29c1e8';
                let width = data.width || 1;
                let $vm = new LineJsPlugin({
                    propsData: {
                        id: data.id,
                        x1: data.x1,
                        y1: data.y1,
                        x2: data.x2,
                        y2: data.y2,
                        color: color,
                        width: width
                    }
                }).$mount();
                map[data.id] = { "vm": $vm, "target": target };
                target.appendChild($vm.$el);
            },
            closeLine: function (id) {
                let $m = map[id];
                let $vm = $m.vm, target = $m.target;
                target.removeChild($vm.$el);
                delete map[id];
            },
            closeAll: function () {
                for (let key in map) {
                    let $m = map[key];
                    let $vm = $m.vm, target = $m.target;
                    target.removeChild($vm.$el);
                }
                map = {};
            }
        }
        if (!Vue.prototype.$lineJs) {
            Vue.prototype.$lineJs = lineJs
        }
    }
}