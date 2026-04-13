import { PieChart, PieChartCell } from "@mantine/charts";
import { Flex, Text } from "@mantine/core";

type Props = {
  pointsData: PieChartCell[];
  winsData: PieChartCell[];
};

export const ScorePieCharts = ({ pointsData, winsData }: Props) => {
  return (
    <>
      <Flex gap="xs" direction="column">
        <Text fz="xs" ta="center">
          Total points
        </Text>
        <PieChart
          data={pointsData}
          withTooltip
          withLabels
          labelsPosition="inside"
        />
      </Flex>
      <Flex gap="xs" direction="column">
        <Text fz="xs" ta="center">
          Total wins
        </Text>
        <PieChart
          data={winsData}
          withTooltip
          withLabels
          labelsPosition="inside"
        />
      </Flex>
    </>
  );
};
