import jsCookie from "js-cookie";
import { axiosInstance } from "../../../lib/hoc/api";
import auth_types from "../auth/type";
import qs from "qs" 
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { useToast } from "@chakra-ui/react";

export function userRegister(values, setSubmitting) {
  return async function (dispatch) {

    try {
      let body = {
        // params: {
          email: values.email,
          password: values.password,
          username: values.username,
          full_name: values.full_name
        // },
      };
    
      const res = await axiosInstance.post("/users/register", qs.stringify(body))

      console.log(res.data)

      const userData = res.data.result.user
      const token = res.data.result.token

      console.log(res.data)

      jsCookie.set("auth_token", token);
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

}
