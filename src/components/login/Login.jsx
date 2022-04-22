import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context';
import { idlFactory } from "../../artAirdropNFTs/artAirdropNFTs.did.js";

import "../css/login.css";
import powered from "../../resources/powered.dark.svg";
import icon from "../../resources/Centro/icon.png";
import plug from "../../resources/Centro/PLUG.png";
import stoic from "../../resources/Centro/stoic.png";
import earth from "../../resources/Centro/earth.png";
import ic from "../../resources/Centro/dfinity.png";

import background from "../../resources/design/background.svg";
import leftbackground from "../../resources/design/leftship_background.svg";
import rightbackground from "../../resources/design/rightship_background.svg";
import ship_break from "../../resources/design/ship_break.svg";
import cross from "../../resources/design/cross.svg";
import wallet_icon from "../../resources/design/wallet_icon.svg";
import ship_genesis from "../../resources/design/ship_genesis.svg";
import airdrop_icon from "../../resources/design/airdrop_icon.svg";
import genesis_mid from "../../resources/design/img_genesis_mid.svg";
import ship_icon from "../../resources/design/ship_icon.svg";
import background_logo from "../../resources/design/background_logo.svg";
import join_discord from "../../resources/design/join_discord.svg";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import {StoicIdentity} from "ic-stoic-identity";

const Login = (props) => {
    let { walletData, setWalletData } = useContext(AppContext);
    const earthInstall = "https://www.earthwallet.io";
    const canisterId = "xivc3-liaaa-aaaak-qajjq-cai";
    const whitelist = [canisterId];

    const agent = new HttpAgent({
      host: 'https://mainnet.dfinity.network',
    });
    const artAirdropNFTs = Actor.createActor(idlFactory, {
      agent,
      canisterId
    });

    const [airdropData, setAirdropData] = useState({});
    const [logged, setLogged] = useState(false);
    const [wallet, setWallet] = useState("");
    const [gen, setGen] = useState(false);
    const [genList, setGenList] = useState([]);

    const connectWallet = async (pWallet) => {
        switch(pWallet) {
          case 'stoic':
            loginStoic();
            break;
          case 'plug':
            loginPlug();
            break;
          case 'InternetIdentity':
            loginII();
            break;
          case 'earth':
            loginEarth();
            break;
          default:
        }
    }

    const loginStoic = async () => {
        StoicIdentity.load().then(async identity => {
          if (identity !== false) {
            //ID is a already connected wallet!
          } else {
            identity = await StoicIdentity.connect();
          }
          saveLoggedData(identity.getPrincipal().toString(), "Stoic");
        })
    };

    const loginPlug = async () => {
        const isConnected = await window.ic.plug.requestConnect({
            whitelist,
        });
        const principalId = await window.ic.plug.agent.getPrincipal();
        var string = principalId.toString();
        saveLoggedData(string, "Plug");
    };

    const loginII = async () => {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
          handleAuthenticated(authClient);
        } else {
          let userII = await authClient.login({
            onSuccess: async () => {
              newAuthII();
            },
          });
        }
    };

    const loginEarth = async () => {
        if(window.earth !== undefined) {
            const address = await window.earth.connect();
            const _am = await window.earth.getAddressMeta();
            saveLoggedData(_am.principalId, "Earth");
        } else {
            window.open(earthInstall, "_blank");
        }
    };

    const saveLoggedData = async (_w, _c) => {
      let _d = await artAirdropNFTs.getData(_w);
      console.log("DATA FROM IC", _d);
      setWallet(_w);
      setAirdropData(_d);
      if(_d.valid === true){
        setLogged(false);
        if(_d.genesis === true){
          setGen(true);
          let _l = _d.link.split(",");
          setGenList(_l);
        } else {
          setGen(false);
          window.location.href = _d.link;
        }
      } else {
        setLogged(true);
        setGen(false);
      }
    };

    const redeemGenesis = (ind) => {
      window.open(genList[ind]);
    }

    const newAuthII = async () => {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
          handleAuthenticated(authClient);
        }
    };
    
    const handleAuthenticated = async (authClient) => {
        const identity = await authClient.getIdentity();
        saveLoggedData(identity._principal.toString(), "InternetIdentity");
    };

    const logout = () => {
        setLogged(false);
        setGen(false);
        setWallet("");
        setAirdropData({});
    }

    const goToDiscord = () => {
      window.open("https://discord.gg/cosmicrafts");
    }


    return (
      <div className='main-div'>
        <div className='header-main-div'>
          <div className='header-inner-div'>
            <div className='header-left-div'>
              <div className='header-left-img-div'>
                <a href="https://cosmicrafts.com">
                  <img src="https://dev.cosmicrafts.com/wp-content/uploads/2022/04/Logo-1.png" className="header-img-logo" alt="" loading="lazy" />
                </a>
              </div>
            </div>
            <div className='header-middle-div'>
              
            <div className="">
              <div className="">
                <ul id="menu-main-menu" className="header-links-div">
                  <li id="menu-item-672" className='header-li'>
                    <a className='header-link' href="#">About</a>
                  </li>
                  <li id="menu-item-670" className='header-li'>
                    <a className='header-link' href="https://wp.cosmicrafts.com/">Whitepaper</a>
                  </li>
                  <li id="menu-item-671" className='header-li'>
                    <a className='header-link' href="#">Roadmap</a>
                  </li>
                  <li id="menu-item-673" className='header-li'>
                    <a className='header-link' href="#">Team</a>
                  </li>
                  <li id="menu-item-954" className='header-li'>
                    <a className='header-link' href="#">Community</a>
                  </li>
                  <li id="menu-item-953" className='header-li'>
                    <a className='header-link' href="https://airdrops.cosmicrafts.com">Airdrops</a>
                  </li>
                  <li id="menu-item-955" className='header-li'>
                    <a className='header-link' href="https://play.cosmicrafts.com">Play</a>
                  </li>
                </ul>
              </div>
            </div>

            </div>
          </div>
        </div>
      {
        logged === true ? 
          <div className='middle-div'>
            <div className='div-panel'>
              <img src={background} alt='panel' className='img-panel' />
              <img src={icon} alt='Cosmicrafts icon' className='img-icon' />
              <img src={ship_break} alt='Ship' className='img-ship-break' />
              <img src={cross} alt='cross' className='img-cross' />
              <label className='txt-no-valid'>THIS WALLET IS NOT VALID FOR THIS GIVEAWAY<br />FOLLOW OUR SOCIAL MEDIA FOR FUTURES AIRDROPS</label>
              <div className='div-new-wallet' onClick={() => { logout(); }}>
                <div className='img-bkg'>
                  <img src={wallet_icon} alt='Wallet icon' className='img-wallet-icon' />
                  <label className='txt-new-wallet'>Log in with another wallet</label>
                </div>
              </div>
              <div className='div-airdrop'>
                <label className='txt-airdrop'>AIRDROP</label>
              </div>
            </div>
          </div>
          :
          gen === true ?
          <>
            <div>
              <label className='txt-congrat'><span className='txt-genesis-title'>Genesis CrowdFunder</span>Congratulations, you earned <span className='span-three'>3</span> Airdrop NFTs!</label>
              <img src={ship_genesis} alt='ship' className='img-ship-genesis' />
              <img src={background_logo} alt='ship genesis image' className='img-ship-genesis-back' />
              <div className='btn-airdrop first-airdrop' onClick={() => { redeemGenesis(0); }}>
                <img src={airdrop_icon} alt='airdrop icon' className='airdrop-icon' />
                <label className='lbl-airdrop'>Claim 1st NFT</label>
              </div>
              <div className='btn-airdrop second-airdrop' onClick={() => { redeemGenesis(1); }}>
                <img src={airdrop_icon} alt='airdrop icon' className='airdrop-icon' />
                <label className='lbl-airdrop'>Claim 2nd NFT</label>
              </div>
              <div className='btn-airdrop third-airdrop' onClick={() => { redeemGenesis(2); }}>
                <img src={airdrop_icon} alt='airdrop icon' className='airdrop-icon' />
                <label className='lbl-airdrop'>Claim 3rd NFT</label>
              </div>
              <img src={genesis_mid} alt='genesis image' className='img-genesis-mid' />
              <label className='txt-keep'>Keep holding, we have more surpirses for you, Genesis NFTs Road Map coming soon!</label>
              <label className='txt-keep-mobile-1'>Keep holding, we have more surpirses for you.</label>
              <label className='txt-keep-mobile-2'>Genesis NFTs Road Map coming soon!</label>
              <img src={ship_icon} alt='rocket icon' className='img-rocket-icon' />
            </div>
          </>
          :
          <div className='middle-div'>
            <div className='div-panel'>
              <img src={background} alt='panel' className='img-panel' />
              <img src={icon} alt='Cosmicrafts icon' className='img-icon' />
              <img src={ic} alt='Cosmicrafts icon' className='img-icon-ic' />
              <div className='div-text-login'>
                <label className='text-login'>CONNECT YOUR<br/>WALLET</label>
              </div>
              <div className='div-inner-panel'>
                <div className='div-wallet div-plug'>
                  <div className='img-bkg' onClick={() => { connectWallet("plug"); }}>
                    <img src={plug} alt='Plug wallet' className='img-plug' />
                    <label className='txt-wallet'>Plug Wallet</label>
                  </div>
                </div>
                <div className='div-wallet div-stoic'>
                  <div className='img-bkg' onClick={() => { connectWallet("stoic"); }}>
                    <img src={stoic} alt='Plug wallet' className='img-stoic' />
                    <label className='txt-wallet'>Stoic Wallet</label>
                  </div>
                </div>
                <div className='div-wallet div-earth'>
                  <div className='img-bkg' onClick={() => { connectWallet("earth"); }}>
                    <img src={earth} alt='Plug wallet' className='img-earth' />
                    <label className='txt-wallet'>Earth Wallet</label>
                  </div>
                </div>
                <div className='div-wallet div-ic'>
                  <div className='img-bkg' onClick={() => { connectWallet("InternetIdentity"); }}>
                    <img src={ic} alt='Plug wallet' className='img-ic' />
                    <label className='txt-wallet'>Internet Identity</label>
                  </div>
                </div>
              </div>
              <div className='div-airdrop'>
                <label className='txt-airdrop'>AIRDROP</label>
              </div>
              <div className='div-condition'>
                <label className='txt-condition'>NOTE: ONLY PRE-REGISTERED WALLETS<br/>CAN PARTICIPATE IN AIRDROPS</label>
              </div>
            </div>
            <div className='div-left-background'>
              <img src={leftbackground} className='img-left-background' />
            </div>
            <div className='div-right-background'>
              <img src={rightbackground} className='img-right-background' />
            </div>
          </div>
        }
        <div className='join-discord-div' onClick={() => { goToDiscord(); }}>
          <img src={join_discord} alt='Join our discord' className='join-discord-img' />
        </div>
      </div>
    )
};

export { Login };