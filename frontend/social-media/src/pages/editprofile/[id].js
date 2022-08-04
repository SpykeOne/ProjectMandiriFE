import {
    Box,
    Flex,
    Avatar,
    Stack,
    Button,
    SimpleGrid,
    GridItem,
    Heading,
    FormControl, 
    FormLabel,
    FormHelperText,
    Divider,
    Text, 
    Textarea,
    Icon, 
    chakra,
    VisuallyHidden, 
    Input, 
    Select, 
    Checkbox, 
    RadioGroup,
    Radio,
    Link,
    InputGroup,
    InputLeftAddon,
    useToast
  } from '@chakra-ui/react';
  
  import Navbar from "../../component/Navbar"

  import qs from 'qs';
  import { FaUser } from 'react-icons/fa';
import { userEdit } from '../../redux/reducer/action/userEdit';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Head from "next/head"    
import * as Yup from 'yup'
import axios from 'axios';
import { axiosInstance } from '../../lib/hoc/api';
import { useState } from 'react';
export default function editprofile(){
    const dispatch = useDispatch()
    const router = useRouter()
    const toast = useToast()
    const userSelector = useSelector((state) => state.auth)
  
    //   const formik = useFormik({
    //     initialValues: {
    //       username: ``,
    //       email:``,
    //       full_name: ``,
    //       bio: ``,
    //     },
    //     validationSchema: Yup.object().shape({
    //         full_name: Yup.string().required("DO YOU NOT HAVE A NAME?"),
    //     }),
    //     validateOnChange: false,
    //     onSubmit: (values) => {
    //       dispatch(userEdit(values, formik.setSubmitting));
    //       toast({
    //         title: 'Profile updated',
    //         status: 'success',
    //         isClosable: true
    //       })
    //       router.push("/profile")
    //     },
    //   });

    
      

      const [selectedFile, setSelectedFile] = useState(null)
      const inputFileRef = useRef(null)
  
  
      const handleFile = (event) => {
          setSelectedFile(event.target.files[0])
      }

      const formikAvatar = useFormik({
        initialValues: {

        },
        onSubmit: async ()=>{
            const formData = new FormData()

            formData.append("avatar", selectedFile)

            try{
                await axiosInstance.patch("users/edit-avatar/" + userSelector.id, formData)
                toast({
                    title: 'Avatar Edited',
                    status: 'success',
                    isClosable: true,
                })

            }catch(err){
                console.log(err)
                toast({
                    title: 'Error',
                    status: 'error',
                    isClosable: true,
                })
            }
        }

      })
  
      const formik = useFormik({
          initialValues:{
              username: userSelector.username,
              bio: userSelector.bio,
              full_name: userSelector.full_name,
          },
          onSubmit: async () =>{
              const { username, full_name, bio } = formik.values
  
             const formProfile = {
                username,full_name,bio
             }

              console.log(bio)
            //   formData.append("avatar", selectedFile)
  
              try{
                  await axiosInstance.patch("users/edit-profile/" + userSelector.id, qs.stringify(formProfile)).then(()=>{
                      toast({
                          title: 'Profile updated',
                          status: 'success',
                          isClosable: true,
                      })
                  })
                  console.log(formProfile)
              } catch (err) {
                  console.log(err)
                  toast({
                      title: 'Error',
                      status: "error",
                      isClosable: true,
                  })
              }
          }
      })

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
            <Head>
            <title>Astagram - Edit Profile</title>
            </Head>

            <Navbar></Navbar>

            <Box bg="#edf3f8"_dark={{bg: "#111",}} p={10}>
            <Box>
            <SimpleGrid
            display={{
                base: "initial",
                md: "grid",
            }}
            columns={{
                md: 3,
            }}
            spacing={{
                md: 6,
            }}
            >
            <GridItem
                colSpan={{
                md: 1,
                }}
            >
                <Box px={[4, 0]}>
                <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                    Profile
                </Heading>
                <Text
                    mt={1}
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                    color: "gray.400",
                    }}
                >
                    This information will be displayed publicly so be careful what you
                    share.
                </Text>
                </Box>
            </GridItem>
            <GridItem
                mt={[5, null, 0]}
                colSpan={{
                md: 2,
                }}
            >
                <chakra.form
                method="POST"
                shadow="base"
                rounded={[null, "md"]}
                overflow={{
                    sm: "hidden",
                }}
                >
                <Stack
                    px={4}
                    py={5}
                    bg="white"
                    _dark={{
                    bg: "#141517",
                    }}
                    spacing={6}
                    p={{
                    sm: 6,
                    }}
                >
                    <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                        htmlFor="first_name"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                        >
                        Full name
                        </FormLabel>
                        <Input
                        type="text"
                        defaultValue={userSelector.full_name}
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={(e)=>{formik.setFieldValue("full_name", e.target.value)}}
                        />
                    </FormControl>
                    </SimpleGrid>

                    <FormControl as={GridItem} colSpan={[6, 4]}>
                        <FormLabel
                        htmlFor="username"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                        >
                        Email
                        </FormLabel>
                        <Input type="text"
                        autoComplete="username"
                        defaultValue={userSelector.email}
                        mt={1}
                        disabled='true'
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={(e)=>{formik.setFieldValue("username", e.target.value)}}
                        />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 4]}>
                        <FormLabel
                        htmlFor="username"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                        >
                        Username
                        </FormLabel>
                        <Input type="text"
                        autoComplete="username"
                        defaultValue={userSelector.username}
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={(e)=>{formik.setFieldValue("username", e.target.value)}}
                        />
                    </FormControl>

                    <div>
                    <FormControl id="email" mt={1}>
                        <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                        >
                        Bio
                        </FormLabel>
                        <Textarea
                        placeholder="No Information Given."
                        defaultValue={userSelector.bio}
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: "sm",
                        }}
                        onChange={(e)=>
                            formik.setFieldValue("bio", e.target.value)
                        }
                        />
                        <FormHelperText>
                        Brief description for your profile. URLs are hyperlinked.
                        </FormHelperText>
                    </FormControl>
                    </div>

                    <FormControl>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                        color: "gray.50",
                        }}
                    >
                        Avatar
                    </FormLabel>
                    <Flex alignItems="center" mt={1}>
                        <Avatar
                        boxSize={12}
                        bg="gray.100"
                        _dark={{
                            bg: "gray.800",
                        }}
                        src={userSelector.avatar}
                        />
                        <Input type={'file'} onChange={handleFile}
                        accept={"image/png, image/jpg, image/jpeg, image/gif"} 
                        ref={inputFileRef}>
                        </Input>
                        <Button
                        type="button"
                        ml={5}
                        variant="outline"
                        size="sm"
                        fontWeight="medium"
                        _focus={{
                            shadow: "none",
                        }}
                        onClick={()=>formikAvatar.handleSubmit()}
                        >
                        Change
                        </Button>
                        <Text
                            fontSize="xs"
                            color="gray.500"
                            _dark={{
                            color: "gray.50",
                            }}
                        >
                             PNG, JPG, GIF up to 10MB
                        </Text>
                    </Flex>
                    </FormControl>
                </Stack>
                <Box
                    px={{
                    base: 4,
                    sm: 6,
                    }}
                    py={3}
                    bg="gray.50"
                    _dark={{
                    bg: "#121212",
                    }}
                    textAlign="right"
                >
                    <Button
                    type="submit"
                    colorScheme={"facebook"}
                    fontWeight="md"
                    onClick={formik.handleSubmit}
                    >
                    Save
                    </Button>
                </Box>
                </chakra.form>
            </GridItem>
            </SimpleGrid>
        </Box>  
        </Box>
        </>
    )

}