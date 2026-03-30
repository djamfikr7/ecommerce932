import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "intro",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "discount",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "stock",
      type: "number",
      validation: (rule) => rule.min(0),
      initialValue: 10,
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "T-shirt", value: "t-shirt" },
          { title: "Jacket", value: "jacket" },
          { title: "Pants", value: "pants" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Shorts", value: "shorts" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title,
        subtitle: `$${subtitle}`,
        media: Array.isArray(media) ? media[0] : media,
      };
    },
  },
});
