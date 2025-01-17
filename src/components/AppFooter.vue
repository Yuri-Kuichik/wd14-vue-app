<template>
    <footer>
        <BaseLayout class="footer-section">
            <div class="logo-wrapper">
                <IconLogoTMS />
            </div>
            <span class="copyright">© 2024</span>
        </BaseLayout>
    </footer>
</template>

<script>
import BaseLayout from './BaseLayout.vue';
import IconLogoTMS from './icons/LogoTMS.vue'

export default {
    components: { BaseLayout, IconLogoTMS, }
}
</script>

<style scoped>
footer {
    background: var(--color-background-footer);
}

.footer-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1rem;
}

.logo-wrapper {
    width: 232px;
    height: 24px;
    margin-bottom: 1rem;
}

.copyright {
    font-size: 12px;
    line-height: 1.5;
    font-weight: 400;
    color: rgb(7, 7, 7);
}
</style>