<template>
    <div class="container">
        <div
            v-for="i of config"
            class="item"
            @click="changeActive(i.name)"
            :class="{ active: activeKey === i.name }"
        >
            <img :src="i.stand" draggable="false" />
            <div class="label">
                <span class="name">{{ i.name }}</span>
                <span class="cname">{{ i.cname }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        config: Object,
    },
    data() {
        return {
            activeKey: "",
        }
    },
    methods: {
        changeActive(key) {
            this.activeKey = this.activeKey === key ? "" : key
            this.$emit("updateKey", this.activeKey)
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;

    .item {
        display: flex;
        justify-content: center;
        transition: all 0.6s;
        overflow: hidden;
        flex-shrink: 1;
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        filter: gray;
        max-width: 100%;
        cursor: pointer;

        .label {
            left: 6px;
            top: 6px;
            letter-spacing: 6px;
            position: absolute;
            color: #fff;
            font-size: 30px;
            writing-mode: vertical-lr;
            text-shadow: #333 1px 0 0, #333 0 1px 0, #333 -1px 0 0, #333 0 -1px 0;
        }

        img {
            height: 100%;
        }
    }
    .active {
        flex-grow: 2;
        flex-shrink: 0;
        position: relative;
        top: -10%;
        -webkit-filter: grayscale(0);
        -moz-filter: grayscale(0);
        -ms-filter: grayscale(0);
        -o-filter: grayscale(0);
        filter: grayscale(0);
    }
}
</style>
