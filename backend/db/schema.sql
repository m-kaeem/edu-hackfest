-- HarvestGuard Database Schema
-- Run this script to set up the database tables

-- Farmers table
CREATE TABLE IF NOT EXISTS farmers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    district VARCHAR(100),
    preferred_lang VARCHAR(10) DEFAULT 'bn',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crop batches table
CREATE TABLE IF NOT EXISTS crop_batches (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
    crop_type VARCHAR(100) NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    storage_type VARCHAR(50) DEFAULT 'covered',
    district VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Market prices table
CREATE TABLE IF NOT EXISTS market_prices (
    id SERIAL PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    commodity VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    market_name VARCHAR(255),
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(district, commodity, date)
);

-- Weather cache table (optional, for caching weather data)
CREATE TABLE IF NOT EXISTS weather_cache (
    id SERIAL PRIMARY KEY,
    district VARCHAR(100) UNIQUE NOT NULL,
    data JSONB,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_farmers_email ON farmers(email);
CREATE INDEX IF NOT EXISTS idx_batches_farmer ON crop_batches(farmer_id);
CREATE INDEX IF NOT EXISTS idx_market_district ON market_prices(district);
CREATE INDEX IF NOT EXISTS idx_market_commodity ON market_prices(commodity);
CREATE INDEX IF NOT EXISTS idx_market_date ON market_prices(date);
