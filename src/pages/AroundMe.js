//import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Buttons from "../components/Button/Button";
import Header from "../components/Header/Header";
import PLS from "../../src/assets/img/simpson.jpg";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import "../styles/AroundMe.scss";
//import axios from "axios";
import { usersAroundMe } from "../api/fetchApi";
import bookContext from "../contexts/BookContext";
import BookDetailModal from "../components/BookDetailModal/BookDetailModal";
import Spinner from "../components/Spinner/Spinner";

const ChangeMapVue = ({ userCoords }) => {
  const map = useMap();
  map.setView([userCoords.latitude, userCoords.longitude], map.getZoom());
  return null;
};

const AroundMe = () => {
  const [positionUsers, setpositionUsers] = useState([]);
  const [userCoords, setuserCoords] = useState({ longitude: 0, latitude: 0 });
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    usersAroundMe(setpositionUsers, userCoords.latitude, userCoords.longitude, setisLoading);
  }, [userCoords]);

  //console.log(userCoords.latitude, userCoords.longitude);
  //console.log(positionUsers[0]);
  //console.log(positionUsers);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setuserCoords({ latitude, longitude });
      },
      (error) => console.error(error)
    );
  }, []);

  function livrePLS(banane) {
    // permet de charger une cover de livre si la base de donnée n'en renvoi pas
    if (banane.cover === undefined) {
      return PLS;
    } else {
      return banane.cover;
    }
  }
  const { setOpenedBook } = React.useContext(bookContext);
  return (
    <div>
      <Header />
      <Buttons />
      <div id="map">
        <MapContainer center={[userCoords.latitude, userCoords.longitude]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {positionUsers.length > 0 &&
            positionUsers.map((user, index) => (
              <Marker
                key={index}
                position={{
                  lat: user.location.replace("(", " ").split(",")[0],
                  lng: user.location.replace(")", " ").split(",")[1],
                }}
              >
                <Popup>
                  {user.books.map((banane, index) => (console.log(banane), (<p key={index}>{banane.title}</p>)))}
                </Popup>
              </Marker>
            ))}
          <ChangeMapVue userCoords={userCoords} />
        </MapContainer>
      </div>
      <Box
        className="containerMapLivre"
        component="div"
        sx={{ justifyContent: "center", display: { md: "flex", xs: "grid" }, flexWrap: "wrap" }}
      >
        {" "}
        {!isLoading ? (
          positionUsers.map((user) =>
            user.books.map((banane, index) => (
              <Button onClick={() => setOpenedBook(banane)} key={index}>
                <Card
                  sx={{
                    maxWidth: "200px",
                    m: 2,
                    height: "500px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia component="img" image={livrePLS(banane)} alt="cover de livre" />{" "}
                  <CardContent
                    sx={{
                      overflowY: "auto",
                      marginBottom: " 1px",
                    }}
                  >
                    <Typography gutterBottom sx={{ fontSize: "1.2em" }} component="div">
                      {banane.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <b>Auteur: </b> {banane.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Button>
            ))
          )
        ) : (
          <Spinner />
        )}
      </Box>
      <BookDetailModal />
    </div>
  );
};

export default AroundMe;
