import React from 'react';
import * as SVGLoaders from "svg-loaders-react";
import s from './loader.module.css'

const Loader = ({isFetching}) => {
    return (
        <SVGLoaders.Oval className={isFetching ? `${s.svg}`:`${s.none}`  } height={'200px'} width={'100px'} stroke="#278DF9"/>
    );
};

export default Loader;