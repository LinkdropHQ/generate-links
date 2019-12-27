## How to generate linkdrops

### Clone repo

```bash
git clone https://github.com/LinkdropHQ/generate-links.git
```

### Install dependencies

```bash
yarn install
```

### Setup linkdrop config params

Fill in `config/config.json` file with the following parameters:

```js
{
  "LINKDROP_MASTER_ADDRESS": "", // Linkdrop master (sender) address
  "SIGNING_KEY": "", // Private key ot sign links with
  "FACTORY_ADDRESS": "0xBa051891B752ecE3670671812486fe8dd34CC1c8", // Linkdrop factory address
  "CAMPAIGN_ID": "1", // Campaign id
  "LINKS_NUMBER": "100", // Number of links you want to generate
  "WEI_AMOUNT": "10", // Wei amount per link
  "TOKEN_ADDRESS": "0x0000000000000000000000000000000000000000", // ERC20 token address
  "TOKENS_AMOUNT": "0", // ERC20 tokens amount per link in atomic value
  "EXPIRATION_TIME": "10000000000", // Link expiration UNIX timestamp
  "CHAIN": "mainnet", // Chain identifier
  "DEFAULT_WALLET": ""
}
```

### Generate links

Run `yarn generate` to generate links with the specified config params.

The generated CSV file will be located in `output/linkdrop.csv`
