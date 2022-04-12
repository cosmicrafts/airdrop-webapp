import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context';
import "../css/login.css";
import powered from "../../resources/powered.dark.svg";
import logo_cc from "../../resources/cc_logo_new.png";
import panel from "../../resources/Centro/panel.png";
import icon from "../../resources/Centro/icon.png";
import plug from "../../resources/Centro/PLUG.png";
import stoic from "../../resources/Centro/stoic.png";
import earth from "../../resources/Centro/earth.png";
import ic from "../../resources/Centro/dfinity.png";
import wou from "../../resources/WoU.svg";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import {StoicIdentity} from "ic-stoic-identity";

const Login = (props) => {
    let { walletData, setWalletData } = useContext(AppContext);
    const earthInstall = "https://www.earthwallet.io";
    const whitelist = [
        'onhpa-giaaa-aaaak-qaafa-cai',
        'b7g3n-niaaa-aaaaj-aadlq-cai',
        'e3q2w-lqaaa-aaaai-aazva-cai'
    ];

    const airdropList = ['aca47-jlvn2-rjczs-tigrb-e3ec5-mly6v-balql-nwill-vyyk6-5kuvn-fae'];

    const agent = new HttpAgent({
        host: 'https://mainnet.dfinity.network',
    });

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
          saveLoggedData(identity.getPrincipal().toString(), "", "Stoic");
        })
    };

    const loginPlug = async () => {
        const isConnected = await window.ic.plug.requestConnect({
            whitelist,
        });
        const principalId = await window.ic.plug.agent.getPrincipal();
        var string = principalId.toString();
        saveLoggedData(string, "", "Plug");
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
            saveLoggedData(_am.principalId, "", "Earth");
        } else {
            window.open(earthInstall, "_blank");
        }
    };

    const saveLoggedData = (_w, _u, _c) => {
        let _wallet = {wallet: _w, walletState: "connected", user: _u, walletConnected: _c};
        setWalletData(_wallet);
        localStorage.setItem("cosmic_user", JSON.stringify(_wallet));
        if(airdropList.includes(_w)){
          alert("Valid wallet");
        } else {
          alert("Invalid wallet");
        }
        window.location.href = "/IncorrectWallet";
    };

    const newAuthII = async () => {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
          handleAuthenticated(authClient);
        }
    };
    
    const handleAuthenticated = async (authClient) => {
        const identity = await authClient.getIdentity();
        saveLoggedData(identity._principal.toString(), "", "InternetIdentity");
    };

    const logout = () => {
        let _wallet = {wallet: "", walletState: "disconnected", user: "", walletConnected: ""};
        setWalletData(_wallet);
        localStorage.setItem("cosmic_user", JSON.stringify(_wallet));
    }


    return (
      <div className='main-div'>
        <div className='div-powered'>
          <img src={powered} alt='Powered by' className='img-powered' />
        </div>
        <div className='middle-div'>
          <div className='div-logo'>
            <img src={logo_cc} alt='Coscmicrafts' className='img-logo'/>
          </div>
          <div className='div-panel'>
            <img src={panel} alt='panel' className='img-panel' />
            <img src={icon} alt='Cosmicrafts icon' className='img-icon' />
            <div className='div-text-login'>
              <label className='text-login'>LOGIN WITH YOUR<br/>WALLET</label>
            </div>
            <div className='div-plug'>
              <div className='img-bkg' onClick={() => { connectWallet("plug"); }}>
                <img src={plug} alt='Plug wallet' className='img-plug' />
                <label className='txt-wallet'>PLUG</label>
              </div>
            </div>
            <div className='div-stoic'>
              <div className='img-bkg' onClick={() => { connectWallet("stoic"); }}>
                <img src={stoic} alt='Plug wallet' className='img-stoic' />
                <label className='txt-wallet'>STOIC</label>
              </div>
            </div>
            <div className='div-earth'>
              <div className='img-bkg' onClick={() => { connectWallet("earth"); }}>
                <img src={earth} alt='Plug wallet' className='img-earth' />
                <label className='txt-wallet'>EARTH</label>
              </div>
            </div>
            <div className='div-ic'>
              <div className='img-bkg' onClick={() => { connectWallet("InternetIdentity"); }}>
                <img src={ic} alt='Plug wallet' className='img-ic' />
                <label className='txt-wallet'>IDENTITY</label>
              </div>
            </div>
          </div>
          <label>{walletData.walletState === "disconnected" ? "Select wallet" : "Wallet" }</label>
          <label>
              {
                  walletData.walletState === "disconnected" ? 
                  <>
                      <label className='btn-link' >Plug</label>
                      <label className='btn-link' >Stoic</label>
                      <label className='btn-link' >Earth</label>
                      <label className='btn-link' >Internet Identity</label>
                  </>
                  : 
                  <label className='btn-link' onClick={() => { logout(); }}>{walletData.wallet}</label>
              }
          </label>
        </div>
        <div className='div-airdrop'>
          <label className='txt-airdrop'>AIRDROP</label>
        </div>
        <div className='div-condition'>
          <label className='txt-condition'>ONLY WALLETS REGISTERED IN THE AIRDROPS ARE VALID FOR THIS LINK</label>
        </div>
        <div className='div-wou'>
          <img src={wou} alt='World of Unreal' className='img-wou' />
        </div>
      </div>
    )
};

export { Login };