import { browser } from '$app/environment';
import { register, init } from 'svelte-i18n';

register('en-US', () => import('$lib/locale/en_US.json'));
register('cs-CZ', () => import('$lib/locale/cs_CZ.json'));

init({
    fallbackLocale: 'cs-CZ',
    initialLocale: browser ? window.navigator.language : "cs-CZ",
});
