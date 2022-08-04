import {Box, Flex, Stack, Avatar, Text, Grid, GridItem, Tab, Tabs, TabList,TabPanel,TabPanels,Divider,VStack,Item,Button,Link, AvatarBadge, Center, Spinner, Icon, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../component/Navbar";
import {SettingsIcon} from '@chakra-ui/icons'


export default function profile(){
    const userSelector = useSelector((state)=> state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    return(
        <>
        {isLoading ? (
            <Spinner size={"lg"}/>
        ) : (
            <>
            <Navbar></Navbar>
            <Box w={"100%"} h="100px" display="flex" justifyContent={"space-evenly"}>
                <Stack minH={"50px"} alignContent={'center'}>
                    <Flex>
                        <Center marginRight={'10px'} mt={'20px'}>
                            <Avatar size={"xl"} src={userSelector.avatar}></Avatar>
                        </Center>
                    <Box display={'flex'} ml={'20px'} mt={'20px'}>
                        <Stack spacing={"2"} align='center'>
                        <Text fontSize='lg'> 250 </Text>
                        <Text fontSize="xl">Followers</Text>
                        </Stack>
                    </Box>
                    <Box display={'flex'} ml={'20px'} mt={'20px'}>
                        <Stack spacing={"2"} align='center'>
                        <Text fontSize='lg'> 493 </Text>
                        <Text fontSize="xl"> Following </Text>
                        </Stack>
                    </Box>
                    <Box display={'flex'} ml={'20px'} mt={'20px'}>
                        <Stack spacing={"2"} align='center'>
                        <Text fontSize='lg'> 5 </Text>
                        <Text fontSize="xl"> Posts </Text>
                        </Stack>
                    </Box>
                    <Box display={'flex'} ml={'20px'} mt={'20px'}>
                        <Stack spacing={"2"} align='center'>
                        <Menu>
                            <MenuButton>
                                <Icon as={SettingsIcon} boxSize={"6"} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={()=> router.push("/editprofile" + userSelector.id)}>Edit Profile</MenuItem>
                            </MenuList>
                        </Menu>
                        </Stack>
                    </Box>
                    </Flex>

                        <Stack>
                            <Box ml={"10px"}>
                                <Text fontWeight={"bold"} size={'md'} >{userSelector.username}</Text>
                            </Box>
                            <Box >
                                <Text ml={"10px"}>{userSelector.bio}</Text>
                            </Box>
                        </Stack>

                    <Divider borderColor={"black"}/>

                        <Tabs size='md' variant='enclosed'>
                            <Center>
                            <TabList>
                                <Tab>Posts</Tab>
                                <Tab>Liked</Tab>
                            </TabList>
                            </Center>
                            <TabPanels>
                                <TabPanel>
                                <Grid templateColumns='150px,repeat(3, 1fr)' gap={6}>
                                    <GridItem bg='blue.500' />
                                    <GridItem bg='blue.500' />
                                    <GridItem bg='blue.500' />
                                    <GridItem bg='blue.500' />
                                    <GridItem bg='blue.500' />
                                </Grid>
                                </TabPanel>
                                <TabPanel>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                </Stack>      
            </Box>
        </>
        )}
        </>   
    )
}