<template>
    <div class="container">
        <div class="header">
            <div class="info">
                <img :src="person.avatar" class="avatar" />
                <div class="name">
                    <span>
                        {{ person.cname }}
                    </span>
                    <span>
                        {{ person.name }}
                    </span>
                </div>
            </div>
            <div class="item">
                <span class="title">{{ person.fansName }}数</span>
                <countTo :startVal="0" :endVal="1000000" :duration="2000"></countTo>
            </div>
            <div class="item">
                <span class="title">播放数</span>
                <countTo :startVal="0" :endVal="1000000" :duration="2000"></countTo>
            </div>
            <div class="item">
                <span class="title">获赞数</span>
                <countTo :startVal="0" :endVal="1000000" :duration="2000"></countTo>
            </div>
        </div>
    </div>
</template>

<script>
import countTo from "vue-count-to"

export default {
    props: {
        person: Object,
    },
    components: { countTo },
    data() {
        let fansIconFile = `${this.person.name}_FANS.svg`
        let fansIcon = import("@/assets/" + fansIconFile)
        return {
            fansIcon,
        }
    },
    created() {
        this.changeAvatarpersonalColor()
    },
    methods: {
        changeAvatarpersonalColor() {
            document
                .getElementsByTagName("body")[0]
                .style.setProperty("--border-color", this.person.color)
        },
    },
}
</script>

<style lang='scss' scoped>
$personalColor: var(--border-color, #fff);

.container {
    padding: 80px;

    .header {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        .info {
            display: flex;
            align-items: center;

            .avatar {
                border-radius: 50%;
                width: 100px;
                border: 6px solid $personalColor;
                margin-right: 16px;
            }

            .name {
                display: flex;
                flex-direction: column;
                letter-spacing: 6px;

                color: $personalColor;
                font-size: 30px;
            }
        }

        .item {
            border: 6px solid $personalColor;
            border-radius: 10px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px;
            font-size: 24px;

            .title {
                font-size: 18px;
            }
            .content {
                display: flex;
                align-items: center;
            }
            .fans-icon {
                width: 100px;
            }
        }
    }
}
</style>
