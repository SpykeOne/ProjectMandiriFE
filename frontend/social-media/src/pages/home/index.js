// import GuestNavbar from "../../component/GuestNavbar.jsx"
import Navbar from "../../component/Navbar"
import Head from "next/head"
import Sidebar from "../../component/Sidebar"
import { Center, Flex, Spinner, VStack } from "@chakra-ui/react"
import ContentPost from "../../component/ContentPost"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../lib/hoc/api"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
// import InfiniteScroll from 'react-infinite-scroll-component'
import InfiniteScroll from 'react-infinite-scroller'
export default function home(){
    const router = useRouter()
    const [userPoster, setUserPoster] = useState([])
    const [loadingPage, setLoadingPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const userSelector = useSelector((state)=>state.auth)
    const [loadMore, setLoadMore] = useState(1)
    const rendering = useSelector((state)=>state.post)
    const dispatch = useDispatch()


    const renderPosts = () => {

        return userPoster?.map((val) => {
            const likes = false
            const likeChecker = val.Likes?.find((x)=>{
                return x?.UserId == userSelector.id
            }) 
            !likeChecker ? likes = false : likes = true
            // alert(likeChecker)
            return (
                    <ContentPost
                    username={val.User?.username}
                    location={val.location}
                    image_url={val.image_url}
                    caption={val.caption}
                    number_of_likes={val.number_of_likes}
                    id={val.id}
                    createdAt={val.createdAt}
                    User={val.User}
                    liked={likes}
                    komen = {val.Comments}
                    user_id = {val?.userId}
                    />
            )
        })
        
    }

    // const autoRenderPost = useSelector((state)=>{return state.post})

    // useEffect(()=> {
    //     setTimeout(()=>{
    //         axiosInstance.get("/posts").then((res) => {
    //             setUserPoster(res.data.results)
    //         })
    //     }, 200)
    // },[])

    async function getMorePage(){
        try{
            if(loadMore > 0)
            {
                await axiosInstance.get(`/posts/paging?page=${loadingPage}&limit=5`).then((res)=>{
                    setLoadingPage(loadingPage + 1)
                    console.log(res.data.result)
                    const data = res.data.result
    
                    if(data.length){
                        setLoadingPage(loadingPage + 1)
                        setUserPoster([...userPoster, ...data])
                    }
                    else {
                        setLoadMore(0)
                    }
                })
            }
          
            // console.log('render');
        
        } catch (err) {
            console.log(err)

        }
    }

    useEffect(() => {
        if(rendering?.values !== undefined){
            setLoadingPage(loadingPage)
            console.log("loading new post");
        }
    }, [rendering?.id])

    useEffect(() => {
        if (!userSelector?.id) {
          setIsLoading(false);
          router.push("/auth");
        }
        else{
            setIsLoading(false);
        }
      }, [userSelector?.id]);

    return (
        <>
        {isLoading ? (
            <Center>
                <Spinner size={"lg"} />
            </Center>
        ) : (
        <>
        <Head>
        <title>Astagram</title>
        </Head>
        
        <Navbar />
        <InfiniteScroll pageStart={1} loadMore={getMorePage} hasMore={true || false}>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
            <VStack>
                {renderPosts()}
            </VStack>
        </Flex>
        </InfiniteScroll>
        </>
        )}
    </>
    )
}