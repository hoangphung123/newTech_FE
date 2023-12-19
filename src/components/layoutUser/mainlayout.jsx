// App.js
import React from 'react';
import Header from './header/header';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import { Container, Grid, Box } from "@mui/material";
import './style.css'; // Import file CSS chung của trang web

function Mainlayout({ children }) {
  return (
    <div>
      <Container>
      <Header />
      <Box py={4}>
        <Grid container spacing={4}>
          <Navbar />
          <Grid className='Grid1' item xs={9}>
          {children}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
    </div>
  );
}

export default Mainlayout;
