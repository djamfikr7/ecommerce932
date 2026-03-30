/**
 * Seed script — Creates sample categories and products in Sanity.
 *
 * Usage:
 *   SANITY_API_TOKEN=xxx SANITY_PROJECT_ID=xxx node --loader ts-node/esm src/scripts/seed.ts
 *
 * Or add to package.json:
 *   "seed": "SANITY_API_TOKEN=$SANITY_API_TOKEN node --loader ts-node/esm src/scripts/seed.ts"
 */

import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Set SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Set SANITY_API_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-12-01",
  useCdn: false,
  token,
});

const categories = [
  { title: "Men", slug: "men", description: "Men's fashion collection" },
  { title: "Women", slug: "women", description: "Women's fashion collection" },
  { title: "Kids", slug: "kids", description: "Kids' fashion collection" },
  { title: "Accessories", slug: "accessories", description: "Fashion accessories" },
];

const products = [
  {
    name: "Classic Cotton T-Shirt",
    slug: "classic-cotton-t-shirt",
    intro: "Comfortable everyday essential",
    description: "A premium cotton t-shirt perfect for everyday wear. Soft, breathable fabric with a relaxed fit.",
    price: 29.99,
    discount: 5,
    stock: 50,
    status: "new",
    variant: "t-shirt",
    categorySlug: "men",
  },
  {
    name: "Slim Fit Denim Jacket",
    slug: "slim-fit-denim-jacket",
    intro: "Timeless denim style",
    description: "Classic denim jacket with modern slim fit. Perfect for layering in any season.",
    price: 89.99,
    discount: 15,
    stock: 30,
    status: "hot",
    variant: "jacket",
    categorySlug: "men",
  },
  {
    name: "Athletic Jogger Pants",
    slug: "athletic-jogger-pants",
    intro: "Performance meets comfort",
    description: "Lightweight jogger pants with elastic waistband and tapered leg. Ideal for workouts or casual wear.",
    price: 49.99,
    discount: 0,
    stock: 45,
    status: "new",
    variant: "pants",
    categorySlug: "men",
  },
  {
    name: "Cozy Fleece Hoodie",
    slug: "cozy-fleece-hoodie",
    intro: "Warm and stylish",
    description: "Ultra-soft fleece hoodie with kangaroo pocket. Perfect for cool evenings and lazy weekends.",
    price: 59.99,
    discount: 10,
    stock: 35,
    status: "hot",
    variant: "hoodie",
    categorySlug: "men",
  },
  {
    name: "Summer Linen Shorts",
    slug: "summer-linen-shorts",
    intro: "Breezy summer essential",
    description: "Lightweight linen shorts for hot summer days. Comfortable elastic waist with drawstring.",
    price: 34.99,
    discount: 0,
    stock: 60,
    status: "new",
    variant: "shorts",
    categorySlug: "men",
  },
  {
    name: "Floral Print Blouse",
    slug: "floral-print-blouse",
    intro: "Elegant everyday wear",
    description: "Beautiful floral print blouse with relaxed fit. Perfect for office or weekend outings.",
    price: 39.99,
    discount: 8,
    stock: 40,
    status: "new",
    variant: "t-shirt",
    categorySlug: "women",
  },
  {
    name: "Leather Biker Jacket",
    slug: "leather-biker-jacket",
    intro: "Edgy and bold",
    description: "Premium faux leather biker jacket with asymmetric zip. A statement piece for any wardrobe.",
    price: 129.99,
    discount: 20,
    stock: 20,
    status: "hot",
    variant: "jacket",
    categorySlug: "women",
  },
  {
    name: "High-Waist Yoga Pants",
    slug: "high-waist-yoga-pants",
    intro: "Flex and stretch",
    description: "High-waist yoga pants with 4-way stretch. Moisture-wicking fabric for ultimate comfort.",
    price: 44.99,
    discount: 0,
    stock: 55,
    status: "new",
    variant: "pants",
    categorySlug: "women",
  },
  {
    name: "Oversized Knit Hoodie",
    slug: "oversized-knit-hoodie",
    intro: "Cozy oversized comfort",
    description: "Trendy oversized knit hoodie with drop shoulders. The perfect blend of style and comfort.",
    price: 54.99,
    discount: 12,
    stock: 25,
    status: "hot",
    variant: "hoodie",
    categorySlug: "women",
  },
  {
    name: "Denim Cutoff Shorts",
    slug: "denim-cutoff-shorts",
    intro: "Classic summer staple",
    description: "Classic denim cutoff shorts with frayed hem. A timeless addition to your summer wardrobe.",
    price: 29.99,
    discount: 5,
    stock: 50,
    status: "new",
    variant: "shorts",
    categorySlug: "women",
  },
  {
    name: "Kids Graphic Tee",
    slug: "kids-graphic-tee",
    intro: "Fun and colorful",
    description: "Soft cotton graphic tee for kids. Fun prints that kids love, durability that parents trust.",
    price: 19.99,
    discount: 0,
    stock: 80,
    status: "new",
    variant: "t-shirt",
    categorySlug: "kids",
  },
  {
    name: "Kids Puffer Jacket",
    slug: "kids-puffer-jacket",
    intro: "Warm winter essential",
    description: "Lightweight puffer jacket for kids. Water-resistant with warm synthetic fill.",
    price: 49.99,
    discount: 10,
    stock: 30,
    status: "new",
    variant: "jacket",
    categorySlug: "kids",
  },
  {
    name: "Kids Cargo Pants",
    slug: "kids-cargo-pants",
    intro: "Adventure ready",
    description: "Durable cargo pants for active kids. Multiple pockets for storing treasures.",
    price: 24.99,
    discount: 0,
    stock: 45,
    status: "new",
    variant: "pants",
    categorySlug: "kids",
  },
  {
    name: "Kids Zip-Up Hoodie",
    slug: "kids-zip-up-hoodie",
    intro: "Easy on, easy off",
    description: "Comfortable zip-up hoodie for kids. Soft fleece interior, fun colors available.",
    price: 29.99,
    discount: 5,
    stock: 40,
    status: "hot",
    variant: "hoodie",
    categorySlug: "kids",
  },
  {
    name: "Premium Leather Belt",
    slug: "premium-leather-belt",
    intro: "Classic accessory",
    description: "Genuine leather belt with brushed metal buckle. A timeless accessory for any outfit.",
    price: 34.99,
    discount: 0,
    stock: 60,
    status: "new",
    variant: "t-shirt",
    categorySlug: "accessories",
  },
  {
    name: "Wool Blend Scarf",
    slug: "wool-blend-scarf",
    intro: "Warmth meets style",
    description: "Luxuriously soft wool blend scarf. Perfect for cold weather layering.",
    price: 24.99,
    discount: 0,
    stock: 35,
    status: "new",
    variant: "t-shirt",
    categorySlug: "accessories",
  },
];

async function seed() {
  console.log("Starting seed...");

  // Create categories first
  const categoryRefs: Record<string, string> = {};
  for (const cat of categories) {
    try {
      const doc = await client.create({
        _type: "category",
        title: cat.title,
        slug: { _type: "slug", current: cat.slug },
        description: cat.description,
      });
      categoryRefs[cat.slug] = doc._id;
      console.log(`  ✓ Category: ${cat.title} (${doc._id})`);
    } catch (err) {
      console.error(`  ✗ Category ${cat.title}:`, err);
    }
  }

  // Create products with category references
  for (const prod of products) {
    try {
      const categoryRef = categoryRefs[prod.categorySlug];
      const doc = await client.create({
        _type: "product",
        name: prod.name,
        slug: { _type: "slug", current: prod.slug },
        intro: prod.intro,
        description: prod.description,
        price: prod.price,
        discount: prod.discount,
        stock: prod.stock,
        status: prod.status,
        variant: prod.variant,
        categories: categoryRef
          ? [{ _type: "reference", _ref: categoryRef }]
          : [],
      });
      console.log(`  ✓ Product: ${prod.name} (${doc._id})`);
    } catch (err) {
      console.error(`  ✗ Product ${prod.name}:`, err);
    }
  }

  console.log("\nSeed complete!");
}

seed().catch(console.error);
