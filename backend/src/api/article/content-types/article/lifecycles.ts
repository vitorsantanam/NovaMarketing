/**
 * Lifecycle hook: asigna Sergio García como autor por defecto
 * si no se especifica autor al crear un artículo.
 */
export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
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
};
