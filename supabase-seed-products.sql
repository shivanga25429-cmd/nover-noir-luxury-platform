-- SQL script to seed products into Supabase
-- Run this in your Supabase SQL Editor after running supabase-setup.sql

-- Insert all products
INSERT INTO public.products (id, name, price, image, description, fragrance_family, top_notes, middle_notes, base_notes) VALUES
('Noir-Vanile', 'Noir Vanile', 179.00, 'https://novernoir.com/mockups/mock2.png', 'Smoky tobacco wrapped in creamy vanilla and deep amber warmth. Intense, addictive, and undeniably magnetic.', 'Amber & Spiced', ARRAY['Cinnamon', 'Sweet Tobacco Leaf','Plum'], ARRAY['Vanilla', 'Cacao'], ARRAY['Musk', 'Amber', 'Sandalwood']),

('midnight-rush', 'Midnight Rush', 179.00, 'https://novernoir.com/mockups/mock3.png', 'Luscious pear layered with aromatic lavender and warm spice, wrapped in addictive vanilla and amber. A modern statement of confidence and allure.', 'Amber & Spiced', ARRAY['Pear', 'Lavender','Mint'], ARRAY['Cinnamon', 'Caraway'], ARRAY['Amber', 'Cedar', 'Patchouli']),

('onyx-bloom', 'Onyx Bloom', 179.00, 'https://novernoir.com/mockups/mock1.png', 'Velvety gardenia wrapped in warm spice and creamy coconut, resting on a sensual sandalwood base. Intimate, refined, and irresistibly magnetic.', 'Floral & Creamy', ARRAY['Pepper', 'Cardamom','Ginger'], ARRAY['Gardenia', 'Coconut','Peony'], ARRAY['Creamy', 'slightly sweet', 'tropical-floral']),

('crown-elixir', 'Crown Elixir', 499.00, 'https://novernoir.com/mockups/mock4.png', 'Bright pineapple meets smoldering birch and deep woods, grounded by sensual amber and musk. Commanding presence. Effortless authority.', 'Woody & Smoky', ARRAY['Pineapple', 'Bergamot', 'Blackcurrant'], ARRAY['Birch', 'Patchouli','Jasmine'], ARRAY['Musk', 'Ambergris', 'Oakmoss']),

('midnight-veil', 'Midnight Veil', 499.00, 'https://novernoir.com/mockups/mock5.png', 'Velvety gardenia entwined with juicy pear and warm sugared depth. Soft yet captivating, elegant yet bold.', 'Floral & Creamy', ARRAY['Pear', 'Red Berries', 'Italian Mandarin'], ARRAY['Gardenia', 'Jasmine','Frangipani'], ARRAY['Patchouli', 'Brown Sugar']),

('oud-sovereign', 'Oud Sovereign', 499.00, 'https://novernoir.com/mockups/mock6.png', 'Intense oud infused with golden saffron and deep leathered woods. Bold, opulent, and unapologetically sovereign.', 'Woody & Smoky', ARRAY['Saffron', 'Fresh spicy accords','Slight citrus nuance'], ARRAY['Oud', 'Floral hints','Warm spices'], ARRAY['Woody notes', 'Leather', 'Amber','Musk'])

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  description = EXCLUDED.description,
  fragrance_family = EXCLUDED.fragrance_family,
  top_notes = EXCLUDED.top_notes,
  middle_notes = EXCLUDED.middle_notes,
  base_notes = EXCLUDED.base_notes,
  updated_at = NOW();
