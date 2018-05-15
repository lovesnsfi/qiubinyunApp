<template>
  <div class="replyBox">
      <input type="text" placeholder="输入评论" class="txt">
      <button type="button" class="btnSend">发送</button>
  </div>
</template>

<script>
export default {
    //回复的输入框
    name:'replyBox'
}
</script>

<style lang="scss" scoped>
    @import '../scss/main.scss';
    .replyBox
    {
        height: 50px;
        background-color: white;
        @include flex-box-row;
        @include align-items-center;
        @include justify-content-space-between;
        .txt
        {
            border-radius: 15px;
            outline: none;
            flex:1;
            border:1px solid lightgray;
            padding: 5px 10px;
        }
        .btnSend
        {
            width: 70px;
            border: none;
            outline: none;
            color: lightgray;
            background-color:white;
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>
