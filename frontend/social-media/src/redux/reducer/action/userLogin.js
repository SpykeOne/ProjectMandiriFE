import jsCookie from "js-cookie";
import { axiosInstance } from "../../../lib/hoc/api";
import auth_types from "../auth/type";
import qs from "qs" 

export function userLogin(values, setSubmitting) {
  let body = {
    // params: {
      username: values.usermail,
      email: values.usermail,
      password: values.password,
    // },
  };
  
  return async function (dispatch) {


    try {
     
      const res = await axiosInstance.post("/users/login", qs.stringify(body))
      
      console.log(res.data)
      
      if (res.data.message == "password salah"){
        throw new Error("Wrong password")
      }

      if (!res.data.result) {
        throw new Error("User not found");
      }


      const userData = res?.data?.result?.user
      const token = res?.data?.result?.token

      // console.log(res.data)
      // console.log(userData)
      
      // if (userData.password != values.password) {
      //   throw new Error("Wrong password");

      // }

      // const stringifiedUserData = JSON.stringify(userData);

      jsCookie.set("auth_token", token);
      console.log(userData)

      dispatch({
        type: auth_types.AUTH_LOGIN,
        payload: userData,
      });

      
      setSubmitting(false);
      console.log(userData)


    } catch (err) {
      console.log(err);
      
      setSubmitting(false);
    }
  };

      // try {
      //   const res = await axiosInstance.get("/users/", {
      //     params: {
      //       email: values.email,
      //       password: values.password,
      //     },
      //   });

      //   if (res.data.length === 0) {
      //     throw new Error("user not found");
      //   }
      //   const userData = res.data[0];
      //   dispatch({
      //     type: auth_types.AUTH_LOGIN,
      //     payload: userData,
      //   });

      //   const parseData = JSON.stringify(userData);
      //   jsCookie.set("user_data", parseData);
      //   alert("test");
      // } catch (err) {
      //   console.log(err);

      //   toast({
      //     status: "error",
      //     title: "login failed",
      //     description: err.message,
      //   });
      // }
}
