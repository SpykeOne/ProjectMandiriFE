import { Flex, VStack, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "../../component/Navbar";
import { axiosInstance } from "../../lib/hoc/api";

import ContentPost from "../../component/ContentPost";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function detail () {
    const [ data, setData ] =useState([])    
    const router = useRouter()
    const userSelector = useSelector((state)=>state.auth)

    const { id } = router.query

    const renderPostById = async () => {
     await axiosInstance.get("/posts/specific/" + id).then((res) =>{
        const render = res?.data?.result
        console.log(render)
        setData(render)
     })}


    const render = () => {
        const likes = false
        const likeChecker = data?.Likes?.find((x)=>{
            return x?.UserId == userSelector.id
        }) 
        !likeChecker ? likes = false : likes = true
        return(
            <>
                <ContentPost
                username={data?.User?.username}
                location={data?.location}
                image_url={data?.image_url}
                caption={data?.caption}
                number_of_likes={data?.number_of_likes}
                id={data?.id}
                createdAt={data?.createdAt}
                User={data?.User}
                comments = {data?.comments}
                user_id = {data?.userId}
                liked = {likeChecker}
                />
            </>
         )   
    }
     useEffect(()=>{
            renderPostById();
    }, [router?.isReady])

    return(
        
        <>
        {router.isReady ?
        <>
        <Navbar></Navbar>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
                {render()}
        </Flex>
        </>
        : <Spinner></Spinner>}
        </>
    )

}