import { axiosInstance } from "../../../lib/hoc/api";
import qs from 'qs'
import { useSelector } from "react-redux";

export function userEdit(values, setSubmitting){

    const userSelector = useSelector((state) => state.auth) 
    
    return async function (req, res){
        try {
            let body = {
                username: values.username,
                full_name: values.full_name,
                bio: values.bio,
                userId: userSelector.id   
            }
            await axiosInstance.patch(`/users/edit-profile/${values.id}`, qs.stringify(body))

            const userData = res.data.result.user

            console.log(userData)

            setSubmitting(false)

        } catch (err) {
            console.log(err)

            setSubmitting(false)
        }
    }
}