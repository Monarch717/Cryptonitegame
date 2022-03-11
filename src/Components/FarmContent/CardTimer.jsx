import React, { useState, useEffect } from "react";

const CardTimer = ({ endTime }) => {
  return (
    <p>
      {timerHours} : {timerMinutes}
    </p>
  );
};

export default CardTimer;
