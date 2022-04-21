import React from 'react'
import { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader() {

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
        <div style ={{marginTop:'150px'}}>
            <div className="sweet-loading text-center">

                <ClipLoader color='#000' loading={loading} css='' size={150} />
            </div>
        </div>
  )
}

export default Loader