import React from 'react';
import classes from './RoadmapTile.module.css';



function RoadmapTile({heading, arr, index}) {

    let check = 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/check.png';
    
    function colorMatcher(index) {
        switch (index) {
            case 0:
                return '#61D3FF';
            case 1:
                return '#54DDC5';
            case 2:
                return '#7332D9'
            case 3:
                return '#F58B1F';
            case 4:
                return '#D9127C';
            default:
        }
    }

    return (
        <div className={classes.tile}>
            <div className={classes.heading} style={{color: colorMatcher(index)}}>{heading}</div>
            <div className={classes.border}></div>
            <div>
                {arr.map((ele, index) => {
                    return <div key={index} className={classes.subHeading}>
                        {ele?.status ? <img src={check} alt="" /> : ''}
                        <div>{ele?.text}</div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default RoadmapTile
