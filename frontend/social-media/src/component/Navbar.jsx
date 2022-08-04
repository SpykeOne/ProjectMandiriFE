import { Title } from '@mantine/core' 
import { IoMdNotifications, IoIosSearch, IoIosHome } from 'react-icons/io'
import { BiAddToQueue } from 'react-icons/bi'
import jsCookie from 'js-cookie'
import auth_types from '../redux/reducer/auth/type'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { Flex, Avatar, Menu, MenuButton, MenuList, 
    MenuItem, MenuDivider, Text, Icon, HStack, 
    Heading, Link, Button, Box, 
    MenuGroup,
    Divider, Input, Toast, useToast} from "@chakra-ui/react"
import Image from "next/image"
import { Modal, Group } from '@mantine/core'
import logo from "../asset/astagram-logo.png"
import { useState } from 'react'
import NewPostForm from './NewPostForm'
import axios from 'axios'
import { axiosInstance } from '../lib/hoc/api'
import qs from 'qs'

export default function Navbar(){

    const userSelector = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const toast = useToast()
    const [opened, setOpened] = useState(false)

    function Logout() {
        jsCookie.remove("auth_token");
      
        dispatch({
          type: auth_types.AUTH_LOGOUT
        })
      
          Router.push("/auth")
      }

    function resendVerifEmail(){
        try{
            let body={
                id: userSelector.id,
                username: userSelector.username,
                email: userSelector.email,
            }

            axiosInstance.post("/users/resendVerif", qs.stringify(body))

            toast({
                title: "Verification Email Sent",
                description: "A new verification email has been sent to your email",
                status: "success",
                isClosable: true,
            })

        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <Flex height="70px" alignItems={'center'} justify={'space-around'} borderBottomWidth='2px' borderBottomColor={'white'} width='full' position={'sticky'} top='0' bgColor={"gray.200"} zIndex={2}>
            <Link href='/home'>
                <HStack alignItems={'center'}>
                    <Image src={logo} width="250px" height={"90px"} onClick={()=> Router.push("/home")}></Image>
                </HStack>
            </Link>
            <Flex alignItems={'center'}>
                <Link href='/home'>
                    <Button bgColor='gray.200'>
                        <Icon as={IoIosHome} boxSize='6'></Icon>
                    </Button>
                </Link>
                {userSelector.is_verified ? (
                <>
                <Modal opened={opened}
                onClose={()=> setOpened(false)}>
                    <NewPostForm></NewPostForm>
                </Modal>
                <Group>
                <Button bgColor="gray.200" onClick={()=> setOpened(true)}>
                    <Icon as={BiAddToQueue} boxSize='6'></Icon>
                </Button>
                </Group>
                </>
                ):(
                    <>
                    <Button boxSize="7" bgColor="gray.200" onClick={()=> resendVerifEmail()}>
                        <Text size={"sm"} fontWeight="bold">Verify</Text>
                    </Button>
                    </>
                )}
                <Button bgColor="gray.200">
                    <Icon as={IoMdNotifications} boxSize='6'></Icon>
                </Button>
                <Menu>
                    <MenuButton align={'center'} bg='gray.200' minW={0}>
                        <Box display='flex' marginLeft={'10px'}>
                            <Avatar size={'sm'} src={userSelector.avatar}>
                            </Avatar>
                        </Box>
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title={`Hello, ${userSelector.username}`}>
                            <MenuItem onClick={() => Router.push('/profile/' + userSelector.id)}>My Profile</MenuItem>
                            <MenuItem onClick={() => Router.push('/editprofile/' + userSelector.id)}>Edit Profile</MenuItem>
                        </MenuGroup>
                        <MenuDivider></MenuDivider>
                        <MenuGroup title='System'>
                            <MenuItem onClick={()=> Logout()}>Logout</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>

            </Flex>
        </Flex>
        </>






        // <div className="navContainer">
        //     <div className="navLeft">
        //         <span className="logo">DoubleClick</span>
        //     </div>
        //     <div className="navMiddle">
        //         <div className="searchBar">
        //             <IoIosSearch className='searchIcon'/>
        //             <input type="text" placeholder="Search" className="searchInput" />
        //         </div>
        //     </div>
        //     <div className="navRight">
        //         <div className="navRightIcons">
        //             <div className="clickableIcon">
        //                 <Icon boxSize='7' as={IoIosHome}></Icon>
        //             </div>
        //             <div className='clickableIcon'>
        //                 <Icon boxSize='7' as={BiAddToQueue}></Icon>
        //             </div>
        //             <div className='clickableIcon'>
        //                 <Icon boxSize='7' as={IoMdNotifications}></Icon>
        //             </div>
        //             <div>
        //                 <Button onClick={btnlogout}> Logout </Button>
        //             </div>
        //         </div>
        //     </div>
        //    <Avatar radius='xl'></Avatar>
        // </div>
    )
}
