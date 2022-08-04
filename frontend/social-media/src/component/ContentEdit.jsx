import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../lib/hoc/api";
import { Modal, Group } from "@mantine/core";
import { Box, FormControl, FormLabel, Input, Textarea, Button, Image } from "@chakra-ui/react";
import qs from "qs"


export default function EditContentPost(props) {

    const userSelector = useSelector ((state) => state.auth)

    const {location, image_url, caption, id} = props

    const toast = useToast()

    // const [selectedFile, setSelectedFile] = useState(null)

    const formik = useFormik({
        initialValues:{
            location: `${location}`,
            caption: `${caption}`,
        },
        onSubmit: async () => {
            const {location, caption} = formik.values

            try{
                let body = {
                    location,
                    caption
                }

                await axiosInstance.patch("/posts/" + id, qs.stringify(body)).then(()=>{
                    toast({
                        title: 'Post has been edited',
                        status: "success",
                        isClosable: true
                    })
                })

            } catch (err) {
                console.log(err)
                toast({
                    title: 'error',
                    status: 'error',
                    isClosable: true
                })
            }
        }
    })

    // const fileHandler = (event) => {
    //     setSelectedFile(event.target.files[0])
    // }

    return(
        <>
        <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
            <Box maxW='400px' maxH='350px' objectFit='fill'>
                    <Image src={`${image_url}`} w='400px' h='350px' objectFit='cover' rounded={5} />
                        </Box>
                        <Box mt='10px'>
                        <FormControl mt='10px'>
                            <FormLabel>Location</FormLabel>
                            <Input placeholder='Location' maxLength='2000' w='400px'
                            onChange={(e) => {
                                formik.setFieldValue("location", e.target.value)
                            }} defaultValue={location} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Caption</FormLabel>
                            <Textarea placeholder='Caption' maxLength='2000' w='400px' h='150px'
                            onChange={(e) => {
                                formik.setFieldValue("caption", e.target.value)
                            }} defaultValue={caption} />
                        </FormControl>

                        <Box mt={'17px'} justifyContent='flex-end'>
                            <Button mr={3} colorScheme='facebook' onClick=
                            {() => {
                                async function submit() {
                                formik.handleSubmit();
                                }
                                submit()
                            }}>
                            Edit Post
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}