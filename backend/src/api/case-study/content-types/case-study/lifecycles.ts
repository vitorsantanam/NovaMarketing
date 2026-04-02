export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    // Autor por defecto: Sergio García
    if (!data.author) {
      const authors = await (strapi.documents as any)('api::author.author').findMany({
        filters: { name: { $containsi: 'Sergio' } },
        limit: 1,
      });
      const list = Array.isArray(authors) ? authors : [];
      if (list.length > 0) {
        data.author = list[0].documentId ?? list[0].id;
      }
    }
  },
  beforeUpdate(event: any) {
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
