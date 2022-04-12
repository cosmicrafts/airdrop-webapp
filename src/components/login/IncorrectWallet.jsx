import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context';
import "../css/incorrectWallet.css";
import powered from "../../resources/powered.dark.svg";
import logo_cc from "../../resources/cc_logo_new.png";
import panel from "../../resources/Centro/Vector_40.png";
import cancel from "../../resources/Centro/cancel.png";

const IncorrectWallet = (props) => {
    let { walletData, setWalletData } = useContext(AppContext);

    const logout = () => {
        let _wallet = {wallet: "", walletState: "disconnected", user: "", walletConnected: ""};
        setWalletData(_wallet);
        localStorage.setItem("cosmic_user", JSON.stringify(_wallet));
    }


    return (
      <div className='main-div-i'>
        <div className='div-powered'>
          <img src={powered} alt='Powered by' className='img-powered' />
        </div>
        <div className='middle-div'>
          <div className='div-logo'>
            <img src={logo_cc} alt='Coscmicrafts' className='img-logo'/>
          </div>
          <div>
            <img src={cancel} alt='cancel' className='img-cancel-i' />
            <img src={panel} alt='panel' className='img-panel-i' />
            <label className='txt-no-valid-i'>THAT WALLET IS NOT VALID FOR THIS AIRDROP<br />STAY TUNED ON OUR TWITTER FOR FUTURES AIRDROPS</label>
          </div>
        </div>
      </div>
    )
};

export { IncorrectWallet };