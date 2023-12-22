import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import Header from "./header";
import './main.css'
import Footer from "./footer";

function MainLayout({ children }) {
  return (
    <Container>
      <Header />
      <Box py={4}>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

export default MainLayout;
