import { Box, Divider, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import { formatNumber } from "../../utils/FormatNumber";

interface BaseStatsProps {
  stats: Array<{
    name: string;
    abbreviation: string;
    base_stat: number;
    maxStatValue: number;
  }>;
}

const BaseStats = ({ stats }: BaseStatsProps) => {
  return (
    <Box className="base-stats" w={"100%"}>
      <Text color={"primary.900"} fontWeight={"bold"}>
        Base Stats
      </Text>
      <HStack height={"100%"}>
        <VStack w={"20%"} alignItems={"end"}>
          {stats?.map((stat) => (
            <Text
              key={stat.name}
              fontSize={"sm"}
              fontWeight={"extrabold"}
              textTransform={"uppercase"}
              color={"primary.900"}
            >
              {stat.abbreviation}
            </Text>
          ))}
        </VStack>
        <Divider orientation="vertical" borderWidth={"1.5px"} margin={8} />
        <VStack w={"80%"}>
          {stats?.map((stat) => (
            <HStack w={"100%"} key={stat.name}>
              <Text fontSize={"sm"}>{formatNumber(stat.base_stat)}</Text>
              <Progress
                value={stat.base_stat}
                max={stat.maxStatValue}
                colorScheme="green"
                size="sm"
                w={"100%"}
                borderRadius={4}
              />
            </HStack>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
};

export default BaseStats;
