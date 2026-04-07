function sanitizeSlug(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ñÑ]/g, 'n')
    .replace(/[çÇ]/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (data.slug) {
      data.slug = sanitizeSlug(data.slug);
    } else if (data.title) {
      data.slug = sanitizeSlug(data.title);
    }
    // Autor por defecto: Sergio García
    if (!data.author) {
      try {
        const authors = await (strapi.documents as any)('api::author.author').findMany({
          filters: { name: { $containsi: 'Sergio' } },
          limit: 1,
        });
        const list = Array.isArray(authors) ? authors : [];
        if (list.length > 0) {
          data.author = list[0].documentId ?? list[0].id;
        }
      } catch {}
    }
  },
  async beforeUpdate(event: any) {
    const { data } = event.params;
    if (data.slug) {
      data.slug = sanitizeSlug(data.slug);
    }
  },
};
