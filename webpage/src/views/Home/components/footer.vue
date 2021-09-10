<template>
    <div>
        <a target="_blank" :href="link">
            <img src="//www.bilibili.com/favicon.ico" width="20px" />
            {{ message }}
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "bili@枝江大学教育系草教授",
            link: "https://space.bilibili.com/8044179",
        }
    },
}
</script>

<style lang="scss" scpoed>
a {
    text-decoration: none;
    color: #000;
    display: flex;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 20px;

    img {
        margin-right: 8px;
    }
}
</style>
