-- Create Locations table
CREATE TABLE IF NOT EXISTS locations (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  provider_id VARCHAR(3) NOT NULL,
  city VARCHAR(45),
  state VARCHAR(20),
  country_code CHAR(2),
  gps_latitude DOUBLE PRECISION,
  gps_longitude DOUBLE PRECISION,
  address_full TEXT,
  provider_name VARCHAR(100),
  twentyfourseven BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Tariffs table
CREATE TABLE IF NOT EXISTS tariffs (
  id VARCHAR(36) PRIMARY KEY,
  start_date_time TIMESTAMP WITH TIME ZONE,
  end_date_time TIMESTAMP WITH TIME ZONE,
  currency CHAR(3) NOT NULL,
  country_code CHAR(2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Price Components table
CREATE TABLE IF NOT EXISTS price_components (
  id SERIAL PRIMARY KEY,
  tariff_id VARCHAR(36) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  type VARCHAR(20) NOT NULL,
  vat DECIMAL(5, 2),
  step_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tariff_id) REFERENCES tariffs(id) ON DELETE CASCADE
);

-- Create Items table
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  location_id VARCHAR(36) NOT NULL,
  name VARCHAR(16),
  evse_uid VARCHAR(36) NOT NULL,
  connector_id VARCHAR(36),
  standard VARCHAR(20),
  format VARCHAR(20),
  max_voltage INTEGER,
  max_amperage INTEGER,
  max_electric_power INTEGER,
  power_type VARCHAR(20),
  status VARCHAR(20),
  tariff_id VARCHAR(36),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
  CONSTRAINT unique_evse_uid UNIQUE (evse_uid)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_price_components_tariff_id ON price_components(tariff_id);

-- Add comments to columns
COMMENT ON COLUMN locations.country_code IS 'ISO-3166 alpha-2 country code';
COMMENT ON COLUMN tariffs.currency IS 'ISO-4217 currency code';
COMMENT ON COLUMN tariffs.country_code IS 'ISO-3166 alpha-2 country code';
COMMENT ON COLUMN price_components.type IS 'Type of tariff dimension: ENERGY, FLAT, PARKING_TIME, TIME';

-- Create Logs table
CREATE TABLE IF NOT EXISTS app_logs (
  id VARCHAR(36) PRIMARY KEY,
  transaction_id VARCHAR(36) NOT NULL,
  message_id VARCHAR(36) NOT NULL,
  bap_id VARCHAR(50) NOT NULL,
  protocol VARCHAR(20) NOT NULL,
  action VARCHAR(50) NOT NULL,
  stage VARCHAR(50) NOT NULL,
  endpoint VARCHAR(255) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL,
  duration INTEGER,
  status_code INTEGER,
  request_data JSONB,
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add comments for logs table
COMMENT ON COLUMN app_logs.transaction_id IS 'Unique identifier for the transaction';
COMMENT ON COLUMN app_logs.message_id IS 'Unique identifier for the message';
COMMENT ON COLUMN app_logs.bap_id IS 'ID of the BAP (Beckn Application Provider)';
COMMENT ON COLUMN app_logs.protocol IS 'Protocol used (e.g., beckn, ocpi)';
COMMENT ON COLUMN app_logs.action IS 'Action performed (e.g., search, confirm, init)';
COMMENT ON COLUMN app_logs.stage IS 'Stage of the request (e.g., discovery, fulfillment)';
COMMENT ON COLUMN app_logs.endpoint IS 'API endpoint that was called';
COMMENT ON COLUMN app_logs.method IS 'HTTP method used';
COMMENT ON COLUMN app_logs.status IS 'Status of the request (e.g., success, error)';
COMMENT ON COLUMN app_logs.duration IS 'Duration of the request in milliseconds';
COMMENT ON COLUMN app_logs.request_data IS 'Request payload in JSON format';
COMMENT ON COLUMN app_logs.response_data IS 'Response payload in JSON format';
COMMENT ON COLUMN app_logs.error_message IS 'Error message in case of failure';

-- Create indexes for faster querying
CREATE INDEX IF NOT EXISTS idx_app_logs_transaction_id ON app_logs(transaction_id);
CREATE INDEX IF NOT EXISTS idx_app_logs_message_id ON app_logs(message_id);
CREATE INDEX IF NOT EXISTS idx_app_logs_bap_id ON app_logs(bap_id);
CREATE INDEX IF NOT EXISTS idx_app_logs_timestamp ON app_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_app_logs_action_status ON app_logs(action, status);