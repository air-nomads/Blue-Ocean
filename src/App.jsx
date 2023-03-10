import { useState, useEffect } from "react";
import { format } from "date-fns";
import Profile from "./components/profile/profile.jsx";
import LogSignMain from "./components/signlog/LogSignMain.jsx";
import UserSetup from "./components/signlog/UserSetup.jsx";
import CalendarPage from "./components/calendar/Calendar.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import Meals from "./components/modal/meals/Meals.jsx";
import ResponsiveNavBar from "./components/navbar/ResponsiveNavBar.jsx";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import { ThemeProvider } from '@material-ui/core/styles';
import "./css/App.css";


function App() {
  const [count, setCount] = useState(0);
  const [loggedUser, setLoggedUser] = useState("");
  const [component, setComponent] = useState("logsign");
  const [currentDay, setCurrentDay] = useState(new Date());
  const [userObject, setUserObject] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/session").then((res) => {
      console.log("res.data", res.data);
      if (res.data.user_id) {
        //setUserID(res.data.user_id);
        setComponent("dashboard");
        setUserObject({
          username: res.data.username,
          user_id: res.data.user_id,
          isadmin: res.data.isadmin,
        });
      }
    });
  }, []);

  const theme = createTheme({
    palette: {
      mode: !darkMode ? 'light' : 'dark', // or 'dark'
      light: {
        primary: {
        main: '#2196f3',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#fff',
          paper: '#fafafa',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
        },
      },
      // Dark mode values
      dark: {
        primary: {
          main: '#90caf9',
        },
        secondary: {
          main: '#ff4081',
        },
        background: {
          default: '#212121',
          paper: '#424242',
        },
        text: {
          primary: '#fff',
          secondary: '#e0e0e0',
        },
      },
    },
  });

  const ThemeToggle = () => {
    const toggleTheme = () => {
      setDarkMode(!darkMode);
    };

    return (
      <Switch checked={darkMode} onChange={toggleTheme} />
    );
  };

  const currDateInt = Number(format(new Date(currentDay), "yyyyMMdd"));
  // console.log(currDateInt);

  const currComponent = (component) => {
    // console.log("Our current component is:", component);
    switch (component) {
      case "profile":
        // console.log(component);
        return <Profile userID={userObject.user_id} />;
      case "dashboard":
        // console.log(component);
        return (
          <Dashboard
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currDateInt={currDateInt}
            userID={userObject.user_id}
          />
        );
      case "logsign":
        // console.log(component);
        return (
          <LogSignMain
            setUserObject={setUserObject}
            setComponent={setComponent}
          />
        );
      case "calendar":
        // console.log(component);
        return (
          <CalendarPage
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currDateInt={currDateInt}
            userID={userObject.user_id}
          />
        );
    }
  };

  const test = 0;

  return (
    <ThemeProvider theme={theme}>
      <ThemeToggle />
      <Container maxWidth="lg">
        <Box
          sx={{
            height: "100vh",
          }}
        >
          {component !== 'logsign' && component !== 'usersetup' && (
            <ResponsiveNavBar
              sx={{width: '100%'}}
              userObject={userObject}
              setUserObject={setUserObject}
              setComponent={setComponent}
            />
          )}
          {currComponent(component)}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
