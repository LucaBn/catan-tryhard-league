import {
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
    <Group justify="space-between" m="md" align="center">
      <Title>🏝️ Catan Stats</Title>

      <Group>
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
    </Group>
  );
}
