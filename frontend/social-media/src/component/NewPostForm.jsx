import { FormControl, Stack, FormLabel, Input, Flex, Box, Button, useToast } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useFormik } from 'formik'
import { axiosInstance } from "../lib/hoc/api"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { render } from "react-dom"
import post_types from "../redux/reducer/post/type"

export default function NewPostForm(){
    const [selectedFile, setSelectedFile] = useState(null)
    const toast = useToast()
    const inputFileRef = useRef(null)
    const userSelector = useSelector((state) => state.auth)
    const [isRenderPosts, setIsRenderPosts] = useState([])
    const dispatch = useDispatch()
    const autoRenderPost = useSelector((state)=>{return state.post})

    
    //  const fetchPosts = () => {
    //         axiosInstance.get('/posts').then((res) => {
    //             setIsRenderPosts(res.data.result)
    //             console.log(res.data.result)
    //         })
    //     }

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const formik = useFormik({
        initialValues:{
            caption:'',
            location:''
        },
        onSubmit: async () =>{
            const formData = new FormData()
            const { caption, location } = formik.values

            formData.append("caption", caption)
            formData.append("location", location)
            formData.append("user_id", userSelector.id)
            formData.append("image", selectedFile)

            console.log(formData);

            try{
                
                const res = await axiosInstance.post("posts/upload", formData).then(()=>{

                    // fetchPosts()

                    // dispatch({
                    //     type: "POST_RENDER",
                    //     payload: { value: !autoRenderPost.value }
                    //   })  
                    //   console.log('dispatch');

                    toast({
                        title: 'Post has been added',
                        status: 'success',
                        isClosable: true,
                    })
                })
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

    return (
        <Box>
            <Flex 
            minH={'-moz-fit-content'}
            align={'center'}
            justify={'center'}>
                <Stack spacing={4}>
                    <FormControl>
                    <FormLabel>Image</FormLabel>
                    <Input type={'file'} display={'none'} onChange={handleFile}
                    accept={"image/png, image/jpg, image/jpeg, image/gif"}
                    ref={inputFileRef}></Input>
                    <Button colorScheme={"blue"}
                    onClick={() => inputFileRef.current.click()}>Upload Image</Button>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Caption</FormLabel>
                        <Input onChange={(e)=>{
                            formik.setFieldValue('caption', e.target.value)
                        }}></Input>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input onChange={(e)=>{
                            formik.setFieldValue("location",e.target.value)
                        }}></Input>
                    </FormControl>

                    <FormControl align={'center'}>
                        <Button colorScheme={'green'} onClick={formik.handleSubmit}>Submit</Button>
                    </FormControl>

                </Stack>
            </Flex>
        </Box>
    )
}