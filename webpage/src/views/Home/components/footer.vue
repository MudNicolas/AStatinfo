<template>
    <div class="footer">
        <a v-for="e of links" target="_blank" :href="e.link" class="link">
            <svg-icon :icon-class="e.icon" style="width: 22px; margin-right: 6px" />
            {{ e.message }}
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {
                    message: "bili@枝江大学教育系草教授",
                    link: "https://space.bilibili.com/8044179",
                    icon: "bilibili",
                },
                {
                    message: "Github@MudNicolas",
                    link: "https://github.com/MudNicolas/AStatinfo",
                    icon: "github",
                },
            ],
        }
    },
}
</script>

<style lang="scss" scpoed >
.footer {
    margin-top: 50px;
    margin-bottom: 20px;

    .link {
        text-decoration: none;
        display: flex;
        color: #606266;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            margin-right: 8px;
        }
    }
}
</style>
