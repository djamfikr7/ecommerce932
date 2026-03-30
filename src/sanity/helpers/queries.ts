import { groq } from "next-sanity";

export const productsByVariantQuery = groq`
  *[_type == "product" && variant == $variant] | order(name asc)
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(name asc)
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]
`;

export const searchProductsQuery = groq`
  *[_type == "product" && name match $searchParam] | order(name asc)
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
`;

export const allOrdersQuery = groq`
  *[_type == "order"] | order(orderDate desc) {
    ...,
    products[] {
      quantity,
      product-> {
        _id,
        name,
        images,
        price
      }
    }
  }
`;

export const ordersByUserQuery = groq`
  *[_type == "order" && userId == $userId] | order(orderDate desc) {
    ...,
    products[] {
      quantity,
      product-> {
        _id,
        name,
        images,
        price
      }
    }
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(name asc)
`;
