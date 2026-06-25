"use client";

import { useContext } from "react";
import appContext from "../context/AppContext";

const useAppData = () => useContext(appContext);

export default useAppData;
