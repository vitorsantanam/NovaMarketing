"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.title && !data.slug) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-') // replace non-alphanumeric with dash
                .replace(/-+/g, '-') // collapse multiple dashes
                .replace(/^-+|-+$/g, ''); // trim dashes
        }
    },
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.title && !data.slug) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
    },
};
