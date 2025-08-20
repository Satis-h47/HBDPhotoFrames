import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {en, fr} from './translations';

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
};

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    // fallback language is set to english
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;