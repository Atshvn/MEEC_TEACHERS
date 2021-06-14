import { TopMenuAdmin } from "../Template"
import React, { useState, useEffect, useRef } from "react";
import { ContentAccount } from "./ContentAccount";
export const HomeAdmin = () => {
  

    return(
        <div className="unsticky-layout">
            <TopMenuAdmin/>
            <ContentAccount/>


        </div>
    )
}