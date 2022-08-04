import { Box, Text, Avatar } from "@chakra-ui/react";

function Comment({username, content, avatar}){
  
  return (
    <Box marginY="1">
      <Avatar src={avatar}/>
      <Text display="inline" marginLeft={"10px"} fontWeight="bold" marginRight="2">
        {username}
      </Text>
      <Text display="inline">{content}</Text>
    </Box>
  );
};

export default Comment;
