import React from 'react'
import background from 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/background.svg';
import classes from './Background.module.css';

function Background() {
    return (
        <img
        className={classes.backgroundImage}
        src={background}
        alt='Background'
        />
    )
}

export default Background;
