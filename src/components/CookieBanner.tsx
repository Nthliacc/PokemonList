import React, { useState } from "react";
import { Box, Flex, Text, Button, ButtonGroup, Link } from "@chakra-ui/react";
import { setCookie, hasAcceptedCookies } from "../utils/cookies";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  const handleAcceptCookies = () => {
    setShowBanner(false);
    setCookie({ name: "accept-cookies", value: true, days: 30 });
  };

  const handleRejectCookies = () => {
    setShowBanner(false);
  };

  if (hasAcceptedCookies()) {
    return null;
  }

  if (!showBanner) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="white"
      color="gray.800"
      p={6}
      boxShadow="md"
      zIndex={999}
    >
      <Flex
        flexDir={"column"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>
          Nós usamos cookies em nosso site. Os cookies são utilizados para
          disponibilizar as funcionalidades e o uso do nosso site, além de
          contrinuir para nossas analises e melhorar a usabilidade. Ao aceitar e
          continuar a usar este site, você concorda com o uso de cookies. Para
          saber mais sobre cookies,{" "}
          <Link href="https://chakra-ui.com" isExternal>
            leia nossa política de cookies. <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <ButtonGroup
          mt={4}
          spacing={4}
          colorScheme="green"
          alignSelf={"flex-end"}
        >
          <Button
            variant="link"
            colorScheme="green"
            onClick={handleRejectCookies}
          >
            Rejeitar e continuar
          </Button>
          <Button colorScheme="green" onClick={handleAcceptCookies}>
            Aceitar e continuar
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default CookieBanner;
