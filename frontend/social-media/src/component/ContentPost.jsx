import { Box, Avatar, Text, Icon, Input, Button, useToast, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { useState } from "react"
import { Image } from "@chakra-ui/react"
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { axiosInstance } from "../lib/hoc/api";
import { BsThreeDotsVertical } from "react-icons/bs"
import { useDispatch } from "react-redux";
import EditContentPost from "./ContentEdit";
import { Modal, Group } from "@mantine/core";
import qs from "qs"
import Comment from "./Comment";
import moment from 'moment'
import { useRouter } from "next/router";

export default function ContentPost (props){

  // console.log(props)
    const router = useRouter()
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState("")
    const [viewCommentInput, setViewCommentInput] = useState(false)
    const {
      id, image_url, caption, location, username, number_of_likes, User, liked, createdAt,
    komen} 
    = props
    const userSelector = useSelector((state)=> state.auth) 
    const [opened, setOpened] = useState(false)
    const dispatch = useDispatch()
    const toast = useToast()
    const [likes, setLikes] = useState (liked)
    const [numLikes, setNumLikes] = useState(number_of_likes)
    const [maxComments, setMaxComments] = useState(5)
    const [commentPage, setCommentPage] = useState(0)

    //fetch comments
    const fetchComments = () => {

        axiosInstance.get('/comments/', {
            params: {
                PostId: id,
                limit: maxComments,
                // page:commentPage
            }
        })
        .then((res) => {
            setComments(res.data?.result)
            console.log(res.data?.result)
            setMaxComments(maxComments + 5)
            setCommentPage(commentPage + 1)
        })
    }

    //input comment handler
    const commentInputHandler = (event) => {
        const { value } = event.target

        setCommentInput(value)
    }

    useEffect(()=>{
      fetchComments()
    }, [])

    useEffect(()=>{
      fetchComments()
      setNumLikes(number_of_likes)
      setLikes(liked)

    }, [image_url])

    // create new comment
    const newComment = () => {
      const newData = {
        UserId: userSelector.id,
        content: commentInput,
        PostId: id
      }
      try{
        axiosInstance.post("/comments", newData).then(()=> {
          fetchComments()
          setCommentInput("")
        })

        toast ({
          title: "Success",
          description: "Comment has been posted",
          status: "success",
          isClosable: true
        })

      } catch (err) {
        console.log(err)
        toast({
          title: "Error",
          description:"Error",
          status: "error",
          isClosable: true
        })
      }
    }

    async function deletePost() {
      try{

        await axiosInstance.delete("/posts/" + id)

        toast ({
          title: "Deleted",
          description: "Post has been deleted",
          status: "success",
          isClosable: true
        })

      }catch (err){
        console.log(err)
        toast({
          title: "Error",
          description:"there is an error in deleting this post",
          status: "error",
          isClosable: true,
        })
      }
    }

    const likeHandler = async () => {
      let newData = {
        PostId: id,
        UserId: userSelector.id
      }
      setLikes(!likes)

      await axiosInstance.post("/likes", newData).then((res)=>{
        console.log(res.data)
      })
    }


    return(
      <Box borderWidth="1px"  bg='#ffffff' borderRadius="lg" 
      maxW="lg" paddingY="2" marginX="10px"  mb='15px' minW="lg">
      {/* Card Header */}
      <Box paddingX="3" paddingBottom="2" display="flex" alignItems="center" justifyContent={'space-between'}>
        <Box marginLeft="2" display={'flex'}>
        <Avatar 
        src={User?.avatar} size="md" />
        <Box marginLeft={"10px"}>
          <Text fontSize="md" fontWeight="bold">
            {username}
          </Text>
          <Text fontSize="sm" color="GrayText">
            {location}
          </Text>
          </Box>
        </Box>
        <Box>

          <Menu>
            <MenuButton cursor={'pointer'} display={userSelector.id == User?.id ? true : "none"}>
              <Icon as={BsThreeDotsVertical}> </Icon>
            </MenuButton>
            <MenuList>
              <MenuItem>
              <Modal opened={opened}
              onClose={()=> setOpened(false)}>
              <EditContentPost
              location={location}
              image_url={image_url}
              caption={caption}
              id={id}
              opened={true}>
              </EditContentPost>
              </Modal>
              <Group>
                <Button bgColor='white' onClick={()=> setOpened(true)}>
                  <Text> Edit Post</Text>
                </Button>
              </Group>
              </MenuItem>
              <MenuItem>
              <Button bgColor='white' onClick={()=> deletePost()}>
                <Text> Delete Post</Text>
              </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      

      {/* Card Media/Content */}
      <Image src={`${image_url}`} margin={"auto"} minHeight="200px" 
      alignItems={"center"} minW='400px' cursor={"pointer"}
      onClick={()=>router.push(`/detail/${id}`)} />

      {/* Action Buttons */}
      <Box paddingX="3" paddingY="2" display="flex" alignItems="center">
        { likes ? (
          <Icon boxSize={6} as={FaHeart} onClick={()=>{likeHandler();
            setNumLikes(numLikes - 1)}} />
        ) : ( <Icon boxSize={6} as={FaRegHeart} onClick={()=>{likeHandler(); 
          setNumLikes(numLikes + 1)}} /> )}
        <Icon
          onClick={() => setViewCommentInput(true)}
          marginLeft="4"
          boxSize={6}
          as={FaRegComment}
          sx={{
            _hover: {
              cursor: "pointer",
            },
          }}
        />
      </Box>


      {/* Like Count */}
      <Box paddingX="3">
        <Text fontWeight="bold">{numLikes} likes</Text>
      </Box>

      {/* Caption */}
      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>

      {/* Comment Section */}
      <Box paddingX="3" marginTop="4">
        <Text fontWeight="bold" decoration="underline" marginBottom="2">
          {komen?.length} Comments
        </Text>
        { comments?.length > 0 && comments?.map((comment) => {
          return(
            <Comment
            username={comment.User?.username}
            content={comment.content}
            avatar={comment.User?.avatar}
            />
          )
        })

        }

        {/* Comment Input */}
        {viewCommentInput ? (
          <Box display="flex">
            <Input
              onChange={commentInputHandler}
              marginBottom="2"
              type="text"
              placeholder="Insert comment"
              marginRight="4"
              maxLength={"300"}
            />
            <Button onClick={newComment} colorScheme="green">
              Post
            </Button>
          </Box>
        ) : null}

        {/* Comment */}
        {comments?.length === 0 ? (
          <Button onClick={fetchComments} size="xs">
            View comments
          </Button>
        ) : <Button onClick={fetchComments} size="xs">
          View more comments
          </Button>}

        <Box display="flex" w={"auto"} justifyContent={"flex-end"}>
        <Text fontSize={"sm"} color="GrayText">
          {moment(createdAt).fromNow()}
        </Text>
        </Box>


      </Box>
    </Box>
    )
}