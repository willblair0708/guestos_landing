const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createProductsAndPrices() {
  try {
    // Create Core AI Concierge
    const coreProduct = await stripe.products.create({
      name: 'Core AI Concierge',
      description: 'Perfect for businesses starting their AI journey',
    });

    const corePrice = await stripe.prices.create({
      product: coreProduct.id,
      unit_amount: 29900, // $299.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    // Create Professional
    const proProduct = await stripe.products.create({
      name: 'Professional AI Concierge',
      description: 'Enhanced features for growing businesses',
    });

    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 69900, // $699.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    // Create Enterprise (no price, contact sales)
    const enterpriseProduct = await stripe.products.create({
      name: 'Enterprise AI Concierge',
      description: 'Tailored solutions for large organizations',
    });

    console.log('Created products and prices:');
    console.log('Core Price ID:', corePrice.id);
    console.log('Pro Price ID:', proPrice.id);
    console.log('Enterprise Product ID:', enterpriseProduct.id);

    console.log('\nAdd these to your .env.local:');
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC=${corePrice.id}`);
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=${proPrice.id}`);
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE=contact_sales`);
  } catch (error) {
    console.error('Error:', error);
  }
}

createProductsAndPrices(); 