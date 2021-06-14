import { TopMenuAdmin } from "../Template"
import React, { useState, useEffect, useRef } from "react";
import { ContentAccount } from "./ContentAccount";
import { ContentQuestion } from "./ContentQuesion";
export const Question = () => {
  
    

    return(
        <div className="unsticky-layout">
            <TopMenuAdmin/>
            <ContentQuestion/>


        </div>
    )
}