<template>
  <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name:'loading'
}
</script>

<style scoped>
    .box {
    width: 250px;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -125px;
    margin-top: -100px;
    background-color: rgba(0, 0, 0, 0.3);
    transform: scale(0.6);
    z-index: 99;
}

.box div {
    width: 20px;
    height: 20px;
    background-color: rgb(0, 0, 0);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -10px;
    margin-top: -10px;
    text-align: center;
    line-height: 20px;
}


/*假调半径为50*/

.box div:nth-child(1) {
    margin-top: -60px;
    animation: loadding1 1s 0s linear infinite;
}

.box div:nth-child(2) {
    margin-top: -45.4px;
    margin-left: 25.4px;
    animation: loadding1 1s 0.12s linear infinite;
}

.box div:nth-child(3) {
    margin-left: 40px;
    animation: loadding1 1s 0.24s linear infinite;
}

.box div:nth-child(4) {
    margin-left: 25.4px;
    margin-top: 25.4px;
    animation: loadding1 1s 0.36s linear infinite;
}

.box div:nth-child(5) {
    margin-top: 40px;
    animation: loadding1 1s -0.48s linear infinite;
}

.box div:nth-child(6) {
    margin-left: -45.4px;
    margin-top: 25.4px;
    animation: loadding1 1s -0.36s linear infinite;
}

.box div:nth-child(7) {
    margin-left: -60px;
    animation: loadding1 1s -0.24s linear infinite;
}

.box div:nth-child(8) {
    margin-left: -45.4px;
    margin-top: -45.4px;
    animation: loadding1 1s -0.12s linear infinite;
}

@keyframes loadding1 {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(0.3);
        opacity: 0.3;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
