-- SQL script to seed products into Supabase
-- Run this in your Supabase SQL Editor after running supabase-setup.sql

-- Insert all products
INSERT INTO public.products (id, name, price, image, description, fragrance_family, top_notes, middle_notes, base_notes) VALUES
('Noir-Vanile', 'Noir Vanile', 179.00, 'https://novernoir.com/mockups/mock2.png', 'Creamy sandalwood infused with golden honey and warm spices. A scent that wraps you in pure luxury.', 'Woody', ARRAY['Cinnamon', 'Honey'], ARRAY['Sandalwood', 'Iris'], ARRAY['Musk', 'Amber', 'Vanilla']),

('midnight-rush', 'Midnight Rush', 179.00, 'https://novernoir.com/mockups/mock3.png', 'A captivating blend of smoky oud and velvety amber, evoking the mystery of midnight. Bold yet refined, this scent lingers like a whispered secret.', 'Papa', ARRAY['Saffron', 'Bergamot'], ARRAY['Oud', 'Rose'], ARRAY['Amber', 'Sandalwood', 'Musk']),

('onyx-bloom', 'Onyx Bloom', 179.00, 'https://novernoir.com/mockups/mock1.png', 'An opulent bouquet of Damascena rose wrapped in warm vanilla and soft musk. Romantic, timeless, unforgettable.', 'Floral', ARRAY['Pink Pepper', 'Lychee'], ARRAY['Damascena Rose', 'Peony'], ARRAY['Vanilla', 'White Musk', 'Patchouli']),

('crown-elixir', 'Crown Elixir', 499.00, 'https://novernoir.com/mockups/mock4.png', 'Liquid gold in a bottle. Rich amber intertwined with smoky vetiver and a kiss of dark vanilla. The quintessence of luxury.', 'Woody', ARRAY['Black Pepper', 'Cardamom'], ARRAY['Amber', 'Vetiver'], ARRAY['Dark Vanilla', 'Tonka Bean', 'Cedar']),

('midnight-veil', 'Midnight Veil', 499.00, 'https://novernoir.com/mockups/mock5.png', 'Fresh citrus zest meets dark, woody depth. A modern fragrance for those who dare to be different.', 'Fresh', ARRAY['Bergamot', 'Grapefruit', 'Lemon'], ARRAY['Neroli', 'Jasmine'], ARRAY['Cedarwood', 'Vetiver', 'White Musk']),

('oud-sovereign', 'Oud Sovereign', 499.00, 'https://novernoir.com/mockups/mock6.png', 'The crown jewel of our collection. Pure oud blended with royal saffron and precious woods. For those who demand the extraordinary.', 'Papa', ARRAY['Saffron', 'Cinnamon'], ARRAY['Oud', 'Bulgarian Rose'], ARRAY['Agarwood', 'Leather', 'Amber'])

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
