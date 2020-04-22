<template>
  <div
    class="lineSvg"
    :id="'line' + id"
    :style="'top:' + top + 'px;left:' + left +'px;width:' + w + 'px;height:' + h + 'px;'"
    @mouseout="lineShow = false"
    @mouseover.stop="lineShow = true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width=" w +'px'"
      :height="h + 'px'"
    >
      <line :x1="w" x2="0" :y1="lineY1" :y2="lineY2" :style="style" />
    </svg>
    <span class="lineClose" :lineId="id" v-show="lineShow"></span>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      require: true
    }, //当前线的id
    x1: {
      type: Number,
      require: true
    }, //线起点
    y1: {
      type: Number,
      require: true
    }, //线起点
    x2: {
      type: Number,
      require: true
    }, //线终点
    y2: {
      type: Number,
      require: true
    }, //线终点
    color: {
      type: String,
      require: true
    }, //线颜色
    width: {
      type: Number,
      require: true
    } //线宽度
  },
  data() {
    return {
      lineShow: false
    };
  },
  computed: {
    top() {
      //线定位
      return this.y1 - this.y2 > 0 ? this.y2 : this.y1;
    },
    left() {
      //线定位
      return this.x2 - this.x1 > 0 ? this.x1 : this.x2;
    },
    w() {
      //线矩形区域宽
      let w = Math.abs(this.x1 - this.x2);
      return w < 2 ? 2 : w;
    },
    h() {
      //线矩形区域高
      let h = Math.abs(this.y1 - this.y2);
      return h < 2 ? 2 : h;
    },
    lineY1() {
      if (
        (this.h !== 0 && this.x1 < this.x2 && this.y1 < this.y2) ||
        (this.x1 > this.x2 && this.y1 > this.y2)
      ) {
        return this.h;
      } else {
        return 0;
      }
    },
    lineY2() {
      if (
        (this.h !== 0 && this.x1 < this.x2 && this.y1 < this.y2) ||
        (this.x1 > this.x2 && this.y1 > this.y2)
      ) {
        return 0;
      } else {
        return this.h;
      }
    },
    style() {
      return "stroke:" + this.color + ";stroke-width:" + this.width;
    }
  }
};
</script>
<style>
.lineSvg {
  position: absolute;
}

.lineSvg .lineClose {
  position: absolute;
  width: 16px;
  height: 16px;
  left: 50%;
  top: 50%;
  margin: -8px 0 0 -8px;
  cursor: pointer;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEsSURBVDiNpZO7isJAFIa/yQgGrH0BGzuDhSwIC76DYG3v82xvHfARFhYEQSxk0qXJC1gHEnA8W2QSJlm8sP7dnDn/ZWbOKBHhHfS6hSiKBmUZbhDmILOqqk4oDv1+8WWMyf1+5ScYjz8+FWyB0R3DTGCdpsf9HwFH/gGCJ6lvAotaJKhjO+dnZIBAwTaKokEjUJbhphP7G0i8deJqNUaO4xyFecdl2LN6qeCs4NyzegkMWx2O415BZqD87YnVNtZWrwCstjEwaXtUL/TKmR/CCahTp55oq1dW29hLkrRbKk4loDh0BC5XbXcCU4HpVdsdcGnzK44SkWr6ijDh/gB1kfXDYmKMyQMAY0wusAZuL5BvAut6pJtLTNPjXmABZI+c/SlsjuDjrc/0H/wCrLqIl+J3V4oAAAAASUVORK5CYII=)
    center center no-repeat;
}
</style>

