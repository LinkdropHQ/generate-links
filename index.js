const fs = require('fs')
const path = require('path')
const ora = require('ora')
const term = require('terminal-kit').terminal
const ethers = require('ethers')
const fastcsv = require('fast-csv')
const LinkdropSDK = require('@linkdrop/sdk').default
const config = require('./config')

;(async () => {
  let spinner
  try {
    spinner = ora({
      text: term.bold.green.str('Generating links'),
      color: 'green'
    })
    spinner.start()

    const linkdropSDK = new LinkdropSDK({
      linkdropMasterAddress: config.LINKDROP_MASTER_ADDRESS,
      factoryAddress:
        config.FACTORY_ADDRESS || '0xBa051891B752ecE3670671812486fe8dd34CC1c8',
      chain: config.CHAIN || 'mainnet'
    })

    const proxyAddress = linkdropSDK.getProxyAddress(config.CAMPAIGN_ID)

    // Generate links
    const links = []

    for (let i = 0; i < config.LINKS_NUMBER; i++) {
      const {
        url,
        linkId,
        linkKey,
        linkdropSignerSignature
      } = await linkdropSDK.generateLink({
        signingKeyOrWallet: config.SIGNING_KEY,
        weiAmount: config.WEI_AMOUNT || 0,
        tokenAddress: config.TOKEN_ADDRESS || ethers.constants.AddressZero,
        tokenAmount: config.TOKENS_AMOUNT || 0,
        expirationTime: config.EXPIRATION_TIME || 10000000000,
        campaignId: config.CAMPAIGN_ID || 1,
        wallet: config.DEFAULT_WALLET
      })

      links.push({ url })
    }

    // Save links
    const dir = path.join(__dirname, './output')
    const filename = path.join(dir, 'linkdrop.csv')

    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      const ws = fs.createWriteStream(filename)
      fastcsv.write(links).pipe(ws)
    } catch (err) {
      throw new Error(err)
    }

    spinner.succeed(term.bold.str(`Saved generated links to ^_${filename}`))

    return links
  } catch (err) {
    spinner.fail(term.bold.red.str('Failed to generate links'))
    throw new Error(err)
  }
})()
