
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Home.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const labels: Record<number, string> = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
function getLabelText(value: number): string {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value] || "Unknown"}`;
}


function HomePage() {

  const dispatch = useDispatch();

  const Animes = useSelector((store: { AllAnime: any }) => store.AllAnime);

  console.log("all animes", Animes);

  const singleAnime = useSelector((store: { selectAnime: any }) => store.selectAnime);

  console.log("singleAnime", singleAnime);

  const [title, setTitle] = useState("");

  const [imageInput, setImageInput] = useState("");

  const [value, setValue] = useState(2);

  const [hover, setHover] = useState(-1);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_ANIME" });
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const eventForm = new FormData();

  const newAnime = (event:any) => {
    event.preventDefault();
    eventForm.append("image", imageInput);
    eventForm.append("title", title);

    dispatch({
      type: "FETCH_NEW_ANIME",
      payload: eventForm,
    });
    setTitle("");
    setImageInput("");
  };

    const StatusChange = (id:any) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: id,
    });
  };

  const deleteAnime = (anime:any) => {
    dispatch({
      type: "DELETE_ANIME",
      payload: anime,
    });
  };

  const FetchSingleAnime = (id:any) => {
    console.log("payload", id);
    dispatch({
      type: "FETCH_SELECTED_ANIME",
      payload: { id },
    });
  };

  // this component doesn't do much to start, just renders some user reducer info to the DOM

  return (
    <div className="container">
      <div>
        <div>
          <input
            className="inputAnime"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <input
            id="event-image-input"
            type="file"
            onChange={(e:any) => setImageInput(e.target.files[0])}
            // sx={{
            //   width: 230,
            // }}
          />
        </div>
        <div>
          <button className="submitAnime" onClick={newAnime}>
            submit
          </button>
        </div>
      </div>
      <div className="backroundCard">
        {Animes.map((anime:any) => {
          return (
            <div
              className="animeCards"
              key={anime.id}
              onClick={() => FetchSingleAnime(anime.id)}
            >
              <img
                onClick={handleOpen}
                className="cardImage"
                src={anime.image}
                alt={anime.title}
              />
              {/* Like/Unlike Button */}
              <Button className="star" onClick={() => StatusChange(anime.id)}>
                {anime.is_liked ? (
                  <StarOutlinedIcon className="star" />
                ) : (
                  <StarBorderOutlinedIcon className="OutlinedStar" />
                )}
              </Button>
              {/* Delete Button */}
              <Button
                className="deleteAnime"
                onClick={() => deleteAnime(anime)}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
            </div>
          );
        })}
        <div className="ModalHome">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                {singleAnime.map((anime:any) => {
                  return (
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {anime.title}
                      <img
                        className="backgroundImage"
                        src={anime.image}
                        alt=""
                      />

                      <br />
                      <br />

                      <Box
                        sx={{
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="hover-feedback"
                          value={value}
                          precision={0.5}
                          getLabelText={getLabelText}
                          onChange={(event:any, newValue:any) => {
                            setValue(newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        {value !== null && (
                          <Box sx={{ ml: 2 }}>
                            {labels[hover !== -1 ? hover : value]}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  );
                })}
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}
// this allows us to use <App /> in index.js
export default HomePage;
