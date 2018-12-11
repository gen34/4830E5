<template>
  <div id="moments">
    
    <div class="home-pic">
      <div class="home-pic-base" style="padding:0px;">
        <div class="top-pic">
          <div class="top-pic-inner">
            <img src="http://shihaodai.com/e5/img/dsh.9551445c.png">
          </div>
        </div>
        <div class="top-name _ellipsis">Shi Hao Dai</div>
      </div>
    </div>

    <div v-for="item in items" :key="item.date">
      <div class="weui-cell moments__post">
        <div class="weui-cell__hd">
          <span style="color: #aaa;" class="iconfont icon-chat-person"></span>

          <!-- <img width="44" height="44" style="border-radius: 50%" src="../assets/logo.png"> -->
        </div>
        <div class="weui-cell__bd">
          <a class="title">
            <span>{{item.username}}</span>
          </a>
          <p id="paragraph" class="paragraph">{{item.content}}</p>
          <div class="thumbnails my-gallery" data-pswp-uid="1">
            <figure class="thumbnail">
              <img v-bind:src="'http://shihaodai.com:8081/'+item.image" alt="Image description">
              <!-- <figcaption itemprop="caption description">Image 01</figcaption> -->
            </figure>
          </div>

          <div class="toolbar">
            <p class="timestamp">{{item.date | getDateDiff}}</p>
            <div>
              <div id="actionMenu" class="actionMenu slideIn">
                <p id="btnLike" class="actionBtn">
                  <i class="icon icon-96"></i>
                </p>
                <p id="btnComment" class="actionBtn">
                  <i class="icon icon-3"></i>
                </p>
              </div>
            </div>
            <!-- <span id="actionToggle" class="actionToggle">..</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  name: "HelloWorld",
  data: function() {
    return {
      items: []
    };
  },
  created: function() {
    Vue.use(VueAxios, axios);
    Vue.axios.get("http://shihaodai.com:8081/api/get").then(response => {
      this.items = response.data.data;
    });
  },
  filters: {
    getDateDiff: function(timespan) {
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = "now";
      } else if (
        1000 * 60 * 1 < milliseconds &&
        milliseconds <= 1000 * 60 * 60
      ) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60)) + " minutes ago";
      } else if (
        1000 * 60 * 60 * 1 < milliseconds &&
        milliseconds <= 1000 * 60 * 60 * 24
      ) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + " hour ago";
      } else if (
        1000 * 60 * 60 * 24 < milliseconds &&
        milliseconds <= 1000 * 60 * 60 * 24 * 15
      ) {
        timeSpanStr =
          Math.round(milliseconds / (1000 * 60 * 60 * 24)) + " days ago";
      } else if (
        milliseconds > 1000 * 60 * 60 * 24 * 15 &&
        year == now.getFullYear()
      ) {
        timeSpanStr = month + "-" + day + " " + hour + ":" + minute;
      } else {
        timeSpanStr =
          year + "-" + month + "-" + day + " " + hour + ":" + minute;
      }
      return timeSpanStr;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
