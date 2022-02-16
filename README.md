# line-demo

> 在vue项目中通过点击两次鼠标形成一条直线的demo
> [demo演示](https://nianzx.github.io/vue-linejs/dist/index.html)

## 如果在自己项目中使用

1.复制plugins/lineJs文件夹到自己的项目

2.在要使用的地方引入插件(也可以在main里全局注册)
```
//引入插件
import Vue from "vue";
import LineJs from "@/../plugins/lineJs/LineJs";
Vue.use(LineJs);
```

3.调用方法划线删除（具体使用可以参考App.vue）
```
//划线
this.$lineJs.drawLine(target, data);
//删除单根线
this.$lineJs.closeLine(lineId);
//删除所有线
this.$lineJs.closeAll();
```



