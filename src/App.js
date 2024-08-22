import { Box } from "@mui/material";
import "./App.css";
import { Datatable } from "./component/datatable";
import { Navbar } from "./component/navbar";
import { Footercomponent } from "./component/Footer";
import { useState, useEffect } from "react";
import {Loading } from './component/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentScreen = 'screenA';

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadData();
  }, []);

  return (
    <>
      {isLoading && (
        <Loading />
      )}

      {!isLoading && (
        <div>
          <Navbar />
          <Box
            sx={{
              paddingTop: "30px",
              paddingRight: "20px",
              paddingLeft: "20px",
              paddingBottom: "10px",
              // border: '2px solid black',
              borderRadius: "4px",
            }}
          >
            <Datatable currentScreen={currentScreen} />
          </Box>
          <Footercomponent />
        </div>
      )}
    </>
  );
}

export default App;
