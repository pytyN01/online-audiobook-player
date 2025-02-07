import { Title, Center } from "@mantine/core";

export default function Header({ name }) {
  return (
    <Center mt={20}>
      <Title weight={700} size="xl">
        {name}
      </Title>
    </Center>
  );
}
