<script>
    import IconHide from '@/components/icons/IconHide.vue';
    import IconShow from '@/components/icons/IconShow.vue';

    export default {
        components: {
            IconHide,
            IconShow
        },

        props: {
            value: String,
            type: {
                type: String,
                default: 'text'
            }, 
            name: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },  
            passwordField: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },

            errorMessage: {
                type: String,
                default: ''
            }
        },

        computed: {
            isErorr() {
                return !!this.errorMessage.length
            },

            rootClasses() {
                return {
                    'base-input_password': this.passwordField, 
                    'js--error': this.isErorr,
                }
            }
        },

        methods: {
            updateModel(val) {
                this.$emit('changeValue', val)
                // this.$emit('update:modelValue', val)
            }
        }
    }
</script>

<template>
    <div class="base-input" :class="rootClasses">
        <div class="base-input-wrapper">
            <label :for="name">{{ label }}</label>
            <input 
                :type="type" 
                :value="value"
                @input="updateModel($event.target.value)"
                :id="name"
                :placeholder="placeholder"
            >
            <button v-if="passwordField" type="button" @click="$emit('switchType')">
                <span class="icon-wrapper">
                    <IconShow v-if="type === 'text'"/>
                    <IconHide v-else/>
                </span>
            </button>   
        </div>

        <span class="base-input__error"> {{ errorMessage }} </span>
    </div>  
</template>

<style lang="scss" scoped>

input {
    padding: 8px 12px;
    width: 100%;
    min-height: 32px;
    border: 1px solid rgba(0,0,0, .2);
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    cursor: pointer;
    background: var(--color-white) !important;

    &::placeholder {
        color: rgba(0, 0, 0, .26);
    }

    &:focus-visible {
        border-color: rgb(253, 211, 42);
        /* border-color: var(--color-primary); */
    }
}

.base-input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden; 
}

.base-input {
    .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    &_password input {
        padding-right: 42px;
    }

    &_password button {
        position: absolute;
        bottom: 5px;
        right: 5px;
        padding: 8px;
        border-radius: 20px;
        /* color: var(--color-text-emphasis); */
    }

    &_password button:hover {
        background: rgba(192, 201, 216, .2);
    }

    &.js--error input {
        border-color: var(--colors-error);
    }

    &__error {
        margin-top: 4px;
        display: block;
        color: var(--colors-error);
        font-size: 12px;
        line-height: 16px;
    }
}

</style>