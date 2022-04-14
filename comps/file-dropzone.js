import { Group, Text, Center } from "@mantine/core";
import { Headphones } from "tabler-icons-react";
import { Dropzone } from "@mantine/dropzone";

export default function FileDropZone(props) {
  const { setAudio } = props;

  const styles = {
    dropzoneRoot: {
      background: "#282828",
      borderRadius: "0px",
      color: "white",
      border: "none",
      padding: "0px",
    },
    dropzone: {
      pointerEvents: "none",
      height: "100vh",
    },
  };

  const audioFormats = [
    ".aif",
    ".cda",
    ".mid",
    ".mp3",
    ".mpa",
    ".ogg",
    ".wav",
    ".wma",
    ".wpl",
  ];

  function dropFile(files) {
    console.log(files);
    setAudio({
      url: URL.createObjectURL(files[0]),
      name: files[0].name.split(".")[0],
    });
  }

  return (
    <Dropzone
      onReject={() => alert("sorry: file type was rejected")}
      onDrop={(files) => dropFile(files)}
      accept={audioFormats}
      style={styles.dropzoneRoot}
    >
      {() => (
        <Group position="center" spacing="xl" style={styles.dropzone}>
          <div>
            <Center>
              <Headphones
                className="animate__animated animate__infinite infinite animate__tada"
                size={200}
                id="🎧"
              />
            </Center>

            <Center>
              <Text size="xl">Drag 🎵 here or 👆 to select from your 💾</Text>
            </Center>

            <Center>
              <Text mt={10} size="xs">
                DOES NOT WORK ON IOS
              </Text>
            </Center>
          </div>
        </Group>
      )}
    </Dropzone>
  );
}
