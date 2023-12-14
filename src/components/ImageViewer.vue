<template>
    <div v-if="modelValue" class="image_viewer" @mousedown="onMove" @wheel="onWheel" @click.self="close">
        <img :src="modelValue" :style="`transform:translate(${moveX}px, ${moveY}px) scale(${scale})`">
    </div>
</template>

<script>
export default {
    props: { modelValue: String },
    emits: ['update:modelValue'],

    data: () => ({ moveX: 0, moveY: 0, scale: 1 }),

    watch: {
        modelValue(v) {
            if (!v) return
            this.moveX = 0
            this.moveY = 0
            this.scale = 1
        },
    },

    methods: {
        onMove(e) {
            const startX = e.pageX
            const startY = e.pageY
            const originX = this.moveX
            const originY = this.moveY

            const onMoving = (e) => {
                this.moveX = originX + e.pageX - startX
                this.moveY = originY + e.pageY - startY
            }
            const onMoveEnd = (e) => {
                document.body.removeEventListener('mousemove', onMoving)
                document.body.removeEventListener('mouseup', onMoveEnd)
            }
            document.body.addEventListener('mousemove', onMoving)
            document.body.addEventListener('mouseup', onMoveEnd)
        },

        onWheel(e) {
            const scale = this.scale - e.deltaY * 0.0008
            if (scale > 0 && scale < 3) this.scale = scale
        },

        close() {
            this.$emit('update:modelValue', '')
        }
    }
}
</script>

<style>
.image_viewer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, .5);
    user-select: none;
}

.image_viewer img {
    max-height: 66vw;
    min-height: 12vw;
    -webkit-user-drag: none;
}
</style>