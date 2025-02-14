import Player from "../comps/player/index";
import Bookmarks from "../comps/bookmarks/index";
import FileDropZone from "../comps/dropzone/index";
import { Button } from "@mantine/core";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [bookmarks, setBookmarks] = useState([]);
  const [audio, setAudio] = useState(null);
  const player = useRef();

  // Load data from localStorage AFTER the component mounts
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }

    const storedAudio = localStorage.getItem("audio");
    if (storedAudio) {
      setAudio(JSON.parse(storedAudio));
    }
  }, []);

  // Update localStorage when bookmarks change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Update localStorage when audio changes (except on first render)
  useEffect(() => {
    if (audio !== null) {
      localStorage.setItem("audio", JSON.stringify(audio));
    }
  }, [audio]);

  const clearBook = () => {
    setAudio(null);
    localStorage.removeItem("audio"); // Only remove when user clicks X
  };

  const styles = {
    close: {
      root: {
        position: "fixed",
        top: "5px",
        left: "5px",
        background: "#fa5252",
        zIndex: 1000,
      },
    },
  };

  return (
    <>
      {audio && (
        <Button
          onClick={clearBook}
          styles={styles.close}
          variant="filled"
          radius="lg"
          size="sm"
        >
          X
        </Button>
      )}
      <main className="main">
        {audio && (
          <Player
            setBookmarks={setBookmarks}
            name={audio.name}
            url={audio.url}
            player={player}
          />
        )}
        {audio && bookmarks.length > 0 && (
          <Bookmarks
            setBookmarks={setBookmarks}
            bookmarks={bookmarks}
            player={player}
          />
        )}
      </main>
      {!audio && <FileDropZone setAudio={setAudio} />}
    </>
  );
}
