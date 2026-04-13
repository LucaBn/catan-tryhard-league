import {
  Box,
  Group,
  Switch,
  Title,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isThemeSwitchChecked = colorScheme === "dark";

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        zIndex: 1000,
        backdropFilter: "blur(8px)",
        backgroundColor:
          colorScheme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Group justify="space-between" px="md" py="sm" align="center">
        <Title order={3}>🏝️ Catan Stats</Title>

        <Tooltip label="Toggle theme">
          <Switch
            size="md"
            checked={isThemeSwitchChecked}
            onChange={() => toggleColorScheme()}
            color="dark"
            onLabel={<IconSun size={16} />}
            offLabel={<IconMoon size={16} />}
          />
        </Tooltip>
      </Group>
    </Box>
  );
}
