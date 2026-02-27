// Script to update products in Supabase from VS Code
// Run this with: node --loader ts-node/esm update-products.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://irmrchhmtoshpfmfdczz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybXJjaGhtdG9zaHBmbWZkY3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMjQ1NzgsImV4cCI6MjA4NzcwMDU3OH0.M2zCO7Ak4CZHtAaKY3gHQm9xJEYD5bAIr6P38MizXVw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const products = [
  {
    id: 'Noir-Vanile',
    name: 'Noir Vanile',
    price: 179.00,
    image: 'https://novernoir.com/mockups/mock2.png',
    description: 'Smoky tobacco wrapped in creamy vanilla and deep amber warmth. Intense, addictive, and undeniably magnetic.',
    fragrance_family: 'Amber & Spiced',
    top_notes: ['Cinnamon', 'Sweet Tobacco Leaf', 'Plum'],
    middle_notes: ['Vanilla', 'Cacao'],
    base_notes: ['Musk', 'Amber', 'Sandalwood']
  },
  {
    id: 'midnight-rush',
    name: 'Midnight Rush',
    price: 179.00,
    image: 'https://novernoir.com/mockups/mock3.png',
    description: 'Luscious pear layered with aromatic lavender and warm spice, wrapped in addictive vanilla and amber. A modern statement of confidence and allure.',
    fragrance_family: 'Amber & Spiced',
    top_notes: ['Pear', 'Lavender', 'Mint'],
    middle_notes: ['Cinnamon', 'Caraway'],
    base_notes: ['Amber', 'Cedar', 'Patchouli']
  },
  {
    id: 'onyx-bloom',
    name: 'Onyx Bloom',
    price: 179.00,
    image: 'https://novernoir.com/mockups/mock1.png',
    description: 'Velvety gardenia wrapped in warm spice and creamy coconut, resting on a sensual sandalwood base. Intimate, refined, and irresistibly magnetic.',
    fragrance_family: 'Floral & Creamy',
    top_notes: ['Pepper', 'Cardamom', 'Ginger'],
    middle_notes: ['Gardenia', 'Coconut', 'Peony'],
    base_notes: ['Creamy', 'slightly sweet', 'tropical-floral']
  },
  {
    id: 'crown-elixir',
    name: 'Crown Elixir',
    price: 499.00,
    image: 'https://novernoir.com/mockups/mock4.png',
    description: 'Bright pineapple meets smoldering birch and deep woods, grounded by sensual amber and musk. Commanding presence. Effortless authority.',
    fragrance_family: 'Woody & Smoky',
    top_notes: ['Pineapple', 'Bergamot', 'Blackcurrant'],
    middle_notes: ['Birch', 'Patchouli', 'Jasmine'],
    base_notes: ['Musk', 'Ambergris', 'Oakmoss']
  },
  {
    id: 'midnight-veil',
    name: 'Midnight Veil',
    price: 499.00,
    image: 'https://novernoir.com/mockups/mock5.png',
    description: 'Velvety gardenia entwined with juicy pear and warm sugared depth. Soft yet captivating, elegant yet bold.',
    fragrance_family: 'Floral & Creamy',
    top_notes: ['Pear', 'Red Berries', 'Italian Mandarin'],
    middle_notes: ['Gardenia', 'Jasmine', 'Frangipani'],
    base_notes: ['Patchouli', 'Brown Sugar']
  },
  {
    id: 'oud-sovereign',
    name: 'Oud Sovereign',
    price: 499.00,
    image: 'https://novernoir.com/mockups/mock6.png',
    description: 'Intense oud infused with golden saffron and deep leathered woods. Bold, opulent, and unapologetically sovereign.',
    fragrance_family: 'Woody & Smoky',
    top_notes: ['Saffron', 'Fresh spicy accords', 'Slight citrus nuance'],
    middle_notes: ['Oud', 'Floral hints', 'Warm spices'],
    base_notes: ['Woody notes', 'Leather', 'Amber', 'Musk']
  }
];

async function updateProducts() {
  console.log('🚀 Starting product update...\n');

  for (const product of products) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', product.id);

      if (error) {
        console.log(`❌ Failed to update ${product.name}:`, error.message);
      } else {
        console.log(`✅ Updated: ${product.name}`);
      }
    } catch (err) {
      console.log(`❌ Error updating ${product.name}:`, err.message);
    }
  }

  console.log('\n✨ Product update complete! Refresh your website to see changes.');
}

updateProducts();
