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
    setAudio({
      url: URL.createObjectURL(files[0]),
      name: files[0].name.split(".")[0],
    });
  }

  function renderDropzoneCore() {
    return (
      <Group position="center" spacing="xl" style={styles.dropzone}>
        <div>
          <Center mb={10}>
            <span
              className="animate__animated animate__infinite infinite animate__tada"
              style={{ fontSize: "150px" }}
              id="🎧"
            >
              🎧
            </span>
          </Center>

          <Center>
            <Text size="xl">drag or 👆 to select 🎵 from your 💾</Text>
          </Center>
        </div>
      </Group>
    );
  }

  return (
    <Dropzone
      onReject={() => alert("sorry: file type was REJECTED")}
      onDrop={(files) => dropFile(files)}
      style={styles.dropzoneRoot}
      accept={audioFormats}
    >
      {renderDropzoneCore}
    </Dropzone>
  );
}
