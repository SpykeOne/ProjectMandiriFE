import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthRegister from "../../component/AuthRegister";


  export default function SignupCard() {

    const userSelector = useSelector((state)=> state.auth)
    const router = useRouter()
    const [loading, setIsLoading] = useState(true)


    useEffect(() => {
      if (userSelector?.id) {
        setIsLoading(false);
        router.push("/home");
      }
      else{
          setIsLoading(false);
      }
    }, [!userSelector?.id]);

    return (
      <AuthRegister></AuthRegister> 
    );
  }