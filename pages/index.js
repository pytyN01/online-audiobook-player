import "react-h5-audio-player/lib/styles.css";
import { Bookmark, DeviceAudioTape, Headphones } from "tabler-icons-react";
import { BookmarkOff } from "tabler-icons-react";
import { ArrowUpCircle } from "tabler-icons-react";

import AudioPlayer from "react-h5-audio-player";
import styles from "../styles/Home.module.css";

import { useRef, useState, useEffect } from "react";
import { Group, Text, Button, Grid, Card, Center } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

export default function Home() {
  const [audio, setAudio] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);

  const gradient = { from: "#dddddd", to: "gold", deg: 105 };

  const player = useRef();

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || null);

    if (bookmarks) {
      console.log("bookmarks: ", bookmarks);
      setBookmarks([...bookmarks]);
    }
    if (!bookmarks) {
      localStorage.setItem("bookmarks", []);
      setBookmarks(null);
    }
  }, []);

  function dropFile(files) {
    setAudio({
      url: URL.createObjectURL(files[0]),
      name: files[0].name.split(".")[0],
    });
  }

  function formatTime(value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  function addBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    const utime = player.current.audio.current.currentTime;
    const time = formatTime(player.current.audio.current.currentTime);
    const name = audio.name;

    const bookmark = { utime: utime, time: time, name: name };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
  }

  function removeBookmark(index) {
    var filteredBookmarks = [...bookmarks];
    if (index !== -1) {
      filteredBookmarks.splice(index, 1);

      if (filteredBookmarks.length === 0) {
        setBookmarks(null);
      } else {
        setBookmarks(filteredBookmarks);
      }
      localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
    }
  }

  function goToBookmark(bookmark) {
    player.current.audio.current.currentTime = bookmark.utime;
  }

  function renderBookmarks(bookmark, index) {
    return (
      <Card
        styles={{
          root: {
            color: "white",
            background: "#282828",
            minWidth: "350px",
          },
        }}
        key={index}
      >
        <Text align="center" size="xl" mb={20}>
          {`${bookmark.name} Bookmark @ ${bookmark.time}`}
        </Text>

        <Button
          leftIcon={<ArrowUpCircle size={20} />}
          styles={{ root: { color: "black" } }}
          variant="gradient"
          gradient={gradient}
          onClick={() => goToBookmark(bookmark)}
          size="xs"
        >
          Go to Bookmark
        </Button>
        <Button
          leftIcon={<BookmarkOff size={20} />}
          styles={{ root: { color: "black" } }}
          variant="gradient"
          gradient={gradient}
          ml={10}
          onClick={() => removeBookmark(index)}
          size="xs"
        >
          Remove Bookmark
        </Button>
      </Card>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {audio && (
          <Grid my={20}>
            <AudioPlayer
              progressJumpStep={30000}
              src={audio.url}
              ref={player}
              header={
                <Center>
                  <Text size="xl" inline>
                    {audio.name}
                  </Text>
                </Center>
              }
              footer={
                <Center>
                  <Button
                    leftIcon={<Bookmark size={20} />}
                    styles={{ root: { color: "black" } }}
                    variant="gradient"
                    gradient={gradient}
                    onClick={addBookmark}
                    size="xs"
                  >
                    Add Bookmark
                  </Button>
                </Center>
              }
            />
          </Grid>
        )}
        {audio && bookmarks && (
          <>
            {bookmarks.map((bookmark, index) =>
              renderBookmarks(bookmark, index)
            )}
          </>
        )}
        {!audio && (
          <Dropzone
            style={{ background: "#282828", color: "white" }}
            onDrop={(files) => dropFile(files)}
            onReject={() => alert("rejected files")}
            accept={[
              ".aif",
              ".cda",
              ".mid",
              ".mp3",
              ".mpa",
              ".ogg",
              ".wav",
              ".wma",
              ".wpl",
            ]}
          >
            {() => (
              <Group
                position="center"
                spacing="xl"
                style={{
                  minHeight: "90vh",
                  minWidth: "90vw",
                  pointerEvents: "none",
                }}
              >
                <div>
                  <Center>
                    <Headphones size={200} />
                  </Center>

                  <Center>
                  <Text size="xl" inline>
                    Drag audiobook here or click to select from files.
                  </Text>

                  <Text mt={10} size="xl" inline>
                   DOES NOT WORK ON IOS.
                  </Text>
                 </Center>
                </div>
              </Group>
            )}
          </Dropzone>
        )}
      </main>
    </div>
  );
}
