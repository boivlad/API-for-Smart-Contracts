import env from 'dotenv';
import Web3 from 'web3';
import HDWalletProvider from "truffle-hdwallet-provider";
import { config } from '../config';
import * as marketJSON from "../contracts/Market";
const provider = new HDWalletProvider(env.config().parsed.mnemonic, config.ropsten.netURL);
const web3 = new Web3(provider);
const {abi: abiMarket} = marketJSON;
export const market = new web3.eth.Contract(abiMarket, config.ropsten.marketAddress);