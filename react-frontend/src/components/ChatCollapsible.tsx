import React from "react";
import { Button, Box, Input } from "@chakra-ui/react";

const ChatInput = () => {
  return <Input width="4000" />;
};

function ChatCollapsible() {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <>
      {show && (
        <Box
          width="300px"
          height="500px"
          bg="white"
          borderRadius="md"
          color="black"
          shadow="md"
          margin="30"
          justifySelf="end"
          pb="15"
          overflowX="hidden"
          display="flex"
          flexDirection="column"
        >
          <Box
            bg="black"
            color="white"
            fontWeight="900"
            text-align="center"
            pl="5"
            position="absolute"
            width="300px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            Office_PT AI
            <Button
              borderRadius="100"
              padding="0"
              bg="black"
              color="white"
              onClick={handleToggle}
            >
              X
            </Button>
          </Box>
          <Box
            position="absolute"
            width="300"
            bottom="85"
            right="70"
            bg="white"
          >
            <ChatInput />
          </Box>
          <Box pl="15" pr="15" pt="55" pb="30">
            <Box
              maxW="240"
              p="2"
              borderRadius="10"
              bg="gray.100"
              overflowY="scroll"
            >
              According to all known laws of aviation, there is no way a bee
              should be able to fly. Its wings are too small to get its fat
              little body off the ground. The bee, of course, flies anyway
              because bees don't care what humans think is impossible. Yellow,
              black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and
              yellow! Let's shake it up a little. Barry! Breakfast is ready!
              Coming! Hang on a second. Hello? - Barry? - Adam? - Can you
              believe this is happening? - I can't. I'll pick you up. Looking
              sharp. Use the stairs. Your father paid good money for those.
              Sorry. I'm excited. Here's the graduate. We're very proud of you,
              son. A perfect report card, all B's. Very proud. Ma! I got a thing
              going here. - You got lint on your fuzz. - Ow! That's me! - Wave
              to us! We'll be in row 118,000. - Bye! Barry, I told you, stop
              flying in the house! - Hey, Adam. - Hey, Barry. - Is that fuzz
              gel? - A little. Special day, graduation. Never thought I'd make
              it. Three days grade school, three days high school. Those were
              awkward. Three days college. I'm glad I took a day and hitchhiked
              around the hive. You did come back different. - Hi, Barry. -
              Artie, growing a mustache? Looks good. - Hear about Frankie? -
              Yeah. - You going to the funeral? - No, I'm not going. Everybody
              knows, sting someone, you die. Don't waste it on a squirrel. Such
              a hothead. I guess he could have just gotten out of the way. I
              love this incorporating an amusement park into our day. That's why
              we don't need vacations. Boy, quite a bit of pomp... under the
              circumstances. - Well, Adam, today we are men. - We are! -
              Bee-men. - Amen! Hallelujah! Students, faculty, distinguished
              bees, please welcome Dean Buzzwell. Welcome, New Hive City
              graduating class of... ...9:15. That concludes our ceremonies. And
              begins your career at Honex Industries! Will we pick our job
              today? I heard it's just orientation. Heads up! Here we go. Keep
              your hands and antennas inside the tram at all times. - Wonder
              what it'll be like? - A little scary. Welcome to Honex, a division
              of Honesco and a part of the Hexagon Group. This is it! Wow. Wow.
              We know that you, as a bee, have worked your whole life to get to
              the point where you can work for your whole life. Honey begins
              when our valiant Pollen Jocks bring the nectar to the hive. Our
              top-secret formula is automatically color-corrected,
              scent-adjusted and bubble-contoured into this soothing sweet syrup
              with its distinctive golden glow you know as... Honey! - That girl
              was hot. - She's my cousin! - She is? - Yes.
            </Box>
          </Box>
        </Box>
      )}
      <Button onClick={handleToggle} position="relative" bottom="0" left="90vw">
        Chat
      </Button>
    </>
  );
}

export default ChatCollapsible;
