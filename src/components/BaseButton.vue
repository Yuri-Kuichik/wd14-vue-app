<template>
    <button class="base-batton" :class="rootClass">
        <VueSpinner v-if="loading" />
        <span v-else>
            {{ textButton }}
        </span>
    </button>  
</template>

<script>
import VueSpinner from './VueSpinner.vue';

export default {
    components: { 
        VueSpinner 
    },
    
    props: {
        textButton: {
            type: String,
            default: 'Click me'
        },
        size: {
            type: String,
            default: 'm'
        },
        loading: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        rootClass() {
            return {
                [`base-batton_size--${this.size}`]: true
            }
        }
    }
}
</script>

<style scoped>
.base-batton {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    background: rgb(253, 211, 42);
    color: rgb(7, 7, 7);
    border-radius: 8px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    max-width: 100%;
    width: 100%;
    height: 48px;
}

.base-batton:hover {
    opacity: 0.9;
}

.base-batton_size--s {
    height: 36px;
}

.base-batton_size--m {
    height: 42px;
}

.base-batton_size--l {
    padding: 0 16px;
    height: 48px;
}


</style>
