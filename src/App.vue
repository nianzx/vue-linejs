<template>
  <div>
    <el-button v-on:click="link()" type="primary">划线</el-button>
    <el-button v-on:click="closeAll()" type="primary">删除所有</el-button>
	点击划线按钮后，在框内点击两个点，画出一条线，点击线上的x按钮可以删除划线
    <div
      class="optionsMod"
      ref="optionsMod"
      style="width:1500px;height:800px;border:1px solid #000"
      @click="clickEvent"
    ></div>
  </div>
</template>

<script>
//引入插件
import Vue from "vue";
import LineJs from "@/../plugins/lineJs/LineJs";
Vue.use(LineJs);


export default {
  data() {
    return {
      flag: false,
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1
    };
  },
  methods: {
    //划线，这边只是一个标识，表示准备划线了
    link: function() {
      this.flag = true;
    },
    //清除所有划线
    closeAll: function() {
      this.$lineJs.closeAll();
    },

    clickEvent(e) {
      //表示当前要划线
      let f = true;
      for (let i of e.path) {
        //单点删除线的点击事件
        if (i.nodeName && i.nodeName.toLowerCase() === "span" && i.className === "lineClose") {
          let lineId = i.getAttribute("lineid");
          this.$lineJs.closeLine(lineId);
          //本地点击是为了删除划线，改为false
          f = false;
          break;
        }
      }

      if (this.flag && f) {
        let x = e.clientX,
          y = e.clientY;

        if (this.x1 < 0 && this.y1 < 0) {
          this.x1 = x;
          this.y1 = y;
        } else {
          this.x2 = x;
          this.y2 = y;
        }

        if (this.x1 > 0 && this.y1 > 0 && this.x2 > 0 && this.y2 > 0) {
          //划线插件方法 第一个参数对应上方的div表示放在哪里，第二个参数是线的参数，其中color和width可以不填
          this.$lineJs.drawLine(this.$refs["optionsMod"], {
            id: Math.random(),
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2,
            color: "#000000",
            width: 1
          });
          //划线完毕，坐标恢复初始化
          this.flag = false;
          this.x1 = -1;
          this.x2 = -1;
          this.y1 = -1;
          this.y2 = -1;
        }
      }
    }
  }
};
</script>


