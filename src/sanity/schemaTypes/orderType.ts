import { defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "userId",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerEmail",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerAddress",
      type: "text",
    }),
    defineField({
      name: "customerPhone",
      type: "string",
    }),
    defineField({
      name: "products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.images",
              price: "product.price",
            },
            prepare({ product, quantity, image, price }) {
              return {
                title: `${product} x${quantity}`,
                subtitle: `$${price}`,
                media: Array.isArray(image) ? image[0] : image,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "totalPrice",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "currency",
      type: "string",
      initialValue: "USD",
    }),
    defineField({
      name: "amountDiscount",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "paymentMethod",
      type: "string",
      options: {
        list: [
          { title: "Cash on Delivery", value: "cod" },
          { title: "Card Payment", value: "card" },
        ],
      },
      initialValue: "cod",
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Packed", value: "packed" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "orderDate",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      total: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      status: "status",
    },
    prepare({ name, total, currency, orderId, status }) {
      const snippet = orderId ? `${orderId.slice(0, 8)}...` : "";
      return {
        title: `${name} (${snippet})`,
        subtitle: `$${total} ${currency?.toUpperCase()} - ${status}`,
      };
    },
  },
});
