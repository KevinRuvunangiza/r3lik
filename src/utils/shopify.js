const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

// Core engine to communicate with Shopify
export async function shopifyFetch({ query, variables = {} }) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Shopify GraphQL Errors:', result.errors);
      throw new Error('Failed to fetch from Shopify API');
    }

    return result.data;
  } catch (error) {
    console.error('Error connecting to Shopify:', error);
    throw error;
  }
}

// Fetches catalog and maps it to your R3lik data structure
export async function fetchCatalog() {
  const query = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });

  return data.products.edges.map(({ node }) => {
    const imageUrl = node.images.edges[0]?.node.url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop";
    const priceAmount = node.variants.edges[0]?.node.price.amount || "0.00";
    const currency = node.variants.edges[0]?.node.price.currencyCode || "ZAR";

    return {
      id: node.handle,
      sys_name: node.handle.toUpperCase().replace(/-/g, '_'),
      title: node.title,
      price: `${parseFloat(priceAmount).toLocaleString()} ${currency}`,
      armor_type: "STANDARD_ISSUE",
      material: "DATA_UNKNOWN",
      weight: "0.0kg",
      description: node.description || "No classification data available.",
      image: imageUrl
    };
  });
}