import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TestComp from '../components/TestComp';
import { withReactContext } from 'storybook-react-context';
import { SettingsStateContext, useSettingsState } from '../context/settings';
import { TimerStateContext, useTimerState } from '../context/timerContext';
import { SwapDataStateContext, SwapDataUpdateContext } from '../context/swap';
import { FormWizardStateUpdateContext } from '../context/formWizardProvider';
import ConnectWallet from '../components/Wizard/Steps/Wallet/ConnectWallet';
const settings = {
    "data": {
        "discovery": {
            "identity_url": "https://identity-api-dev.layerswap.cloud",
            "resource_storage_url": "https://devlslayerswapbridgesa.blob.core.windows.net/"
        },
        "exchanges": [
            {
                "display_name": "Coinbase",
                "internal_name": "COINBASE",
                "status": "active",
                "oauth_connect_url": "https://www.coinbase.com/oauth/authorize?client_id=6ee7b63f40353593848f27c4a4189f215cbc7c67b59c29ef4d23050aa90bfb0f&redirect_uri=https%3A%2F%2Fbridge-api-dev.layerswap.cloud%2Fapi%2Fcallback%2Fcoinbase&response_type=code&account=all&scope=wallet%3Auser%3Aemail%2Cwallet%3Aaddresses%3Aread%2Cwallet%3Aaddresses%3Acreate&state=",
                "oauth_authorize_url": "https://www.coinbase.com/oauth/authorize?client_id=6ee7b63f40353593848f27c4a4189f215cbc7c67b59c29ef4d23050aa90bfb0f&redirect_uri=https%3A%2F%2Fbridge-api-dev.layerswap.cloud%2Fapi%2Fcallback%2Fcoinbase&response_type=code&account=all&scope=wallet%3Atransactions%3Aread%2Cwallet%3Auser%3Aread%2Cwallet%3Aaccounts%3Aread%2Cwallet%3Atransactions%3Asend%2Cwallet%3Auser%3Aemail&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=month&state=",
                "authorization_flow": "o_auth2",
                "currencies": [
                    {
                        "asset": "ETH",
                        "withdrawal_fee": 0.00063,
                        "network": "ETHEREUM_MAINNET",
                        "status": "active",
                        "is_default": true
                    }
                ]
            },
            {
                "display_name": "Fake CEX (for testing)",
                "internal_name": "LSCEX",
                "status": "active",
                "oauth_connect_url": null,
                "oauth_authorize_url": null,
                "authorization_flow": "none",
                "currencies": [
                    {
                        "asset": "ETH",
                        "withdrawal_fee": 0,
                        "network": "ETHEREUM_GOERLI",
                        "status": "active",
                        "is_default": true
                    },
                    {
                        "asset": "USDC",
                        "withdrawal_fee": 0,
                        "network": "ETHEREUM_GOERLI",
                        "status": "active",
                        "is_default": true
                    },
                    {
                        "asset": "ETH",
                        "withdrawal_fee": 0,
                        "network": "IMMUTABLEX_MAINNET",
                        "status": "active",
                        "is_default": false
                    }
                ]
            }
        ],
        "networks": [
            {
                "display_name": "Ethereum Goerli",
                "internal_name": "ETHEREUM_GOERLI",
                "status": "active",
                "transaction_explorer_template": "https://goerli.etherscan.io/tx/{0}",
                "currencies": [
                    {
                        "asset": "USDC",
                        "status": "active",
                        "is_deposit_enabled": true,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.5,
                        "fee": 0.09
                    },
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": true,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "StarkNet Goerli",
                "internal_name": "STARKNET_GOERLI",
                "status": "active",
                "transaction_explorer_template": "https://goerli.voyager.online/tx/{0}",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": false,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "ImmutableX Goerli",
                "internal_name": "IMMUTABLEX_GOERLI",
                "status": "active",
                "transaction_explorer_template": "https://immutascan.io/tx/{0}",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": true,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "Ethereum",
                "internal_name": "ETHEREUM_MAINNET",
                "status": "active",
                "transaction_explorer_template": "https://etherscan.io/tx/{0}",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": true,
                        "is_withdrawal_enabled": false,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "Loopring Goerli",
                "internal_name": "LOOPRING_GOERLI",
                "status": "active",
                "transaction_explorer_template": "https://explorer.loopring.io/tx/{0}-transfer",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": true,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "Arbitrum One Goerli",
                "internal_name": "ARBITRUM_GOERLI",
                "status": "active",
                "transaction_explorer_template": "https://goerli.arbiscan.io/tx/{0}",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": true,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "dYdX Goerli",
                "internal_name": "DYDX_GOERLI",
                "status": "active",
                "transaction_explorer_template": "https://trade.stage.dydx.exchange/portfolio/history/transfers",
                "currencies": [
                    {
                        "asset": "USDC",
                        "status": "active",
                        "is_deposit_enabled": false,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 5,
                        "fee": 0.09
                    }
                ]
            },
            {
                "display_name": "Solana Testnet",
                "internal_name": "SOLANA_TESTNET",
                "status": "active",
                "transaction_explorer_template": "https://explorer.solana.com/tx/{0}?cluster=testnet",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": false,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.5,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "Sorare Stage",
                "internal_name": "SORARE_MAINNET",
                "status": "active",
                "transaction_explorer_template": "https://sorare.com/my-sorare/transactions",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": false,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            },
            {
                "display_name": "ImmutableX",
                "internal_name": "IMMUTABLEX_MAINNET",
                "status": "active",
                "transaction_explorer_template": "https://immutascan.io/tx/{0}",
                "currencies": [
                    {
                        "asset": "ETH",
                        "status": "active",
                        "is_deposit_enabled": false,
                        "is_withdrawal_enabled": true,
                        "max_withdrawal_amount": 0.01,
                        "fee": 0.00006
                    }
                ]
            }
        ],
        "currencies": [
            {
                "asset": "USDC",
                "precision": 2,
                "usd_price": 1.001
            },
            {
                "asset": "ETH",
                "precision": 6,
                "usd_price": 1655.96
            }
        ],
        "partners": [
            {
                "internal_name": "loopringAndroid",
                "display_name": "Loopring Wallet",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "loopringWeb",
                "display_name": "Loopring Web",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "ArgentX",
                "display_name": "Argent X Wallet",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "imxMarketplace",
                "display_name": "ImmutableX",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "loopringIos",
                "display_name": "Loopring Wallet",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "zksyncweb",
                "display_name": "zkSync Wallet",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "Argent",
                "display_name": "Argent Wallet",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "perp",
                "display_name": "Perp",
                "is_enabled": true,
                "is_wallet": false
            },
            {
                "internal_name": "imToken",
                "display_name": "imToken wallet",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "braavos",
                "display_name": "Braavos Wallet",
                "is_enabled": true,
                "is_wallet": true
            },
            {
                "internal_name": "TokenPocket",
                "display_name": "TokenPocket",
                "is_enabled": true,
                "is_wallet": true
            }
        ],
        "blacklisted_addresses": [
            {
                "address": "0x0000000000000000000000000000000000000000",
                "network": null
            },
            {
                "address": "0x8a37f0290ae85d08522d2a605617e76128fd0712",
                "network": null
            },
            {
                "address": "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
                "network": null
            },
            {
                "address": "0x2Fc617E933a52713247CE25730f6695920B3befe",
                "network": null
            },
            {
                "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                "network": null
            },
            {
                "address": "0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4",
                "network": null
            }
        ]
    },
    "error": null
}
const swap = { "data": { "id": "46a13309-acfe-49b0-89b5-1320d81b7824", "created_date": "2023-02-03T17:41:08.831559+00:00", "requested_amount": 0.0003, "fee": 0, "status": "user_transfer_pending", "destination_address": "0x4374D3d032B3c96785094ec9f384f07077792768", "deposit_address": "0xC97439666b8d1D2F3F6b3FB30A2b9392aAb2f042", "message": null, "external_id": null, "partner": null, "source_network_asset": "ETH", "source_network": "LOOPRING_GOERLI", "source_exchange": null, "destination_network_asset": "ETH", "destination_network": "ETHEREUM_GOERLI", "destination_exchange": "LSCEX", "has_pending_deposit": false, "input_transaction": null, "output_transaction": null }, "error": null }

export default {
    title: 'Example/Wallet',
    component: TestComp,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    decorators: [withReactContext({
        Context: SettingsStateContext,
        initialState: settings.data,
    }),
    withReactContext({
        Context: SwapDataStateContext,
        initialState: swap.data,
    }),
    withReactContext({
        Context: SwapDataUpdateContext,
    }),
    ],
} as ComponentMeta<typeof TestComp>;

export const Test: ComponentStory<typeof TestComp> = (args) => <TestComp />;


export const Wallet:  ComponentStory<typeof TestComp> = (args) => <ConnectWallet />;
