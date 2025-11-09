# Beckn OCPI Adaptor

> 🚧 **Work in Progress** - This project is under active development and all endpoints are not implemented.

A TypeScript-based adaptor that bridges the Beckn Protocol with the Open Charge Point Interface (OCPI) standard, enabling seamless integration between Beckn network participants and OCPI-compliant charging station operators.

## Features

- OCPI 2.2.1 compliant interface
- Beckn Protocol v1.1 support
- Location-based charging station discovery
- Tariff mapping with price components
- Quote Calculation based on CPO tariffs

## API Endpoints

- POST /auto
  - This endpoint is used to handle all the Beckn requests. This will route the request to the appropriate handler based on the action.
- POST /search
  - This endpoint is used to handle the search request.
- POST /select
  - This endpoint is used to handle the select request.
- POST /init
  - This endpoint is used to handle the init request.
- GET /health
  - This endpoint is used to check the health of the server. Returns 200 OK if server is up and running.
- GET /beckn-logs
  - This endpoint is used to get the logs of the server. Returns all the logs in JSON format. Supports the following query parameters:
    - transaction_id
    - message_id
    - bap_id
    - protocol
    - action
    - stage
    - status
    - method
    - since
    - limit

## Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm or yarn
- OCPI 2.2+ compatible server credentials

## Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/beckn/beckn-ocpi-adaptor.git
   cd beckn-ocpi-adaptor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables(optional):
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```
You can set the environment variables in any other method as well. Dotenv has been setup to set the variables if .env file is present.

4. Run in developer mode:
   ```bash
   npm run dev -- --config ./path/to/config/file.yaml
   ```
If config argument is not passed then it will look for default.yaml file in ./config folder. So to use default config file just run:
```bash
npm run dev
```


## Configuration

### Configuration File

All configuration is done through the configuration file. The default configuration file used is `config/default.yaml`. This can be changed by using the `--config` argument while running the adaptor. Here's a complete example with all available options in the config file:

```yaml
# Environment settings
node_env: development  # development, production, or test
port: 3000  # Port to run the server on

# Database configuration
database:
  url: postgresql://user:password@localhost:5432/beckn_ocpi  # PostgreSQL connection URL

# OCPI Configuration
ocpi:
  url: https://ocpi.example.com/ocpi/cpo/2.2.1  # Base URL for OCPI API
  auth_key: your_ocpi_auth_key_here  # Authentication key for OCPI API

# Beckn Protocol Configuration
beckn:
  version: "1.0"  # Beckn protocol version (1.0 or 2.0)
  bpp_id: your_bpp_id  # Your Beckn Protocol Provider ID
  bpp_uri: https://your-bpp-uri.com  # Base URI for your BPP
  protocol_server_url: https://protocol-server.example.com  # Beckn Protocol Server URL

# Application specific configuration
app:
  discovery:
    default_radius_meters: 5000  # 5km default search radius
    standard_session_kwh: 1      # Default session size in kWh
    share_location_details: true  # Whether to share location details on discovery
  initialization:
    run_migrations_on_startup: true  # Run database migrations during startup
    refresh_ocpi_cache_on_startup: true  # Refresh the OCPI cache during startup
    use_cache: true  # Use the database cache instead of calling OCPI live for discovery data
  
  # Cancellation terms (optional)
  cancellation_terms:
    - fulfillment_state: confirmed
      cancellation_fee:
        percentage: 30  # Percentage of total amount to charge for cancellation
  
  defaults:
    item_name: 'EV Charger'  # Default item name to use
```

### Configuration Reference

#### Database
- `database.url`: PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database`
  - Example: `postgresql://postgres:postgres@localhost:5432/beckn_ocpi`

#### OCPI
- `ocpi.url`: Base URL of the OCPI server
  - Example: `https://ocpi.example.com/ocpi/cpo/2.2.1`
- `ocpi.auth_key`: Authentication key for OCPI API

#### Beckn
- `beckn.version`: Target Beckn protocol version
  - `"1.0"` or `"2.0"`
- `beckn.bpp_id`: Your Beckn Protocol Provider ID
  - Example: `bpp.example.com`
- `beckn.bpp_uri`: Base URI for your BPP
  - Example: `https://bpp.example.com`
- `beckn.protocol_server_url`: Beckn Protocol Server URL
  - Example: `https://protocol.example.com`

#### Application Settings
- `app.discovery.default_radius_meters`: Default search radius in meters
  - Example: `5000` (5km)
- `app.discovery.standard_session_kwh`: Default session size in kWh
  - Example: `1`
- `app.discovery.share_location_details`: Whether to share location details
  - `true` or `false`
- `app.initialization.run_migrations_on_startup`: Runs database migrations when the adaptor boots
  - `true` or `false`
- `app.initialization.refresh_ocpi_cache_on_startup`: Refreshes the OCPI cache when the adaptor boots
  - `true` or `false`
- `app.initialization.use_cache`: When `false`, discovery data is fetched live from the OCPI server instead of the database cache
  - `true` or `false`
- `app.defaults.item_name`: Default item name
  - Example: `'EV Charger'`

### Using Environment Variables
You can provide environment variables in the config yaml file using the following format:
```
${ENV_VARIABLE_NAME}
```

## Data Models and Beckn Mappings

The data models andbeckn mappings are detailed in the [model.md](./ref_docs/model.md) file.

![ocpi_db](./ref_docs/ocpi_db.png)

## Usage

Start the development server:
```bash
npm run dev -- --config ./path/to/config/file.yaml
```
If config argument is not passed then it will look for default.yaml file in ./config folder. So to use default config file just run:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start -- --config ./path/to/config/file.yaml
```
If config argument is not passed then it will look for default.yaml file in ./config folder. So to use default config file just run:
```bash
npm run build
npm start
```

Run discovery service:
```bash
npm run discovery
```
This can be scheduled to run at regular intervals using a task scheduler like cron.

## API Endpoints

- `POST /search` - Search for charging services
- `POST /select` - Select a charging service
- `GET /health` - Health check
- `GET /beckn-logs` - Get application logs

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Reporting Issues

Found a bug? Please help us by [opening an issue](https://github.com/beckn/beckn-ocpi-adaptor/issues/new) with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Logs if applicable

### Pull Request Guidelines

- Update documentation as needed
- Follow the existing code style
- Keep PRs focused on a single feature/fix
- Reference related issues in your PR

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
