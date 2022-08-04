import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    Icon,
    InputRightAddon,
    FormHelperText,
    HStack,
  } from "@chakra-ui/react";
  import Image from "next/image";
  import { IoMdEye, IoMdEyeOff } from "react-icons/io";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useRouter } from "next/router";
  import { userLogin } from "../redux/reducer/action/userLogin";
  import logo from "../asset/astagram-logo.png"
  import bg from "../asset/backgroundLogin.jpg"

  export default function AuthLogin() {
    const [passwordView, setPasswordView] = useState(false);
  
    const userSelector = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
  
      const formik = useFormik({
        initialValues: {
          username: ' ',
          email:' ',
          password: " ",
        },
        validationSchema: Yup.object().shape({
          usermail: Yup.string().required("email/username needs to be filled"),
          password: Yup.string().required("password needs to be filled"),
        }),
        validateOnChange: false,
        onSubmit: (values) => {
          dispatch(userLogin(values, formik.setSubmitting));
        },
      });
    
      useEffect(() => {
        if (userSelector?.id) {
          router.push("/home");
        }
      }, [userSelector.id]);
    
      return (
        <>

          <HStack>
            {/* <Box minH={"100vh"} align={"center"} minW="container.lg">
            </Box> */}
            {/* <Flex
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("gray.50", "gray.800")}
            > */}
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Image src={logo} width={"250px"} height={"70px"}></Image>
                  <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    {formik.values.usermail}
                  </Text>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <FormControl id="email" isInvalid={formik.errors.usermail}>
                      <FormLabel>Email/Username</FormLabel>
        
                      <Input
                        type="email"
                        onChange={(event) =>
                          formik.setFieldValue("usermail", event.target.value)
                        }
                      />
                      <FormHelperText>{formik.errors.usermail}</FormHelperText>
                    </FormControl>
                    <FormControl id="password" isInvalid={formik.errors.password}>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={passwordView ? "text" : "password"}
                          onChange={(event) =>
                            formik.setFieldValue("password", event.target.value)
                          }
                        />
        
                        <InputRightAddon>
                          <Icon
                            fontSize="xl"
                            onClick={() => setPasswordView(!passwordView)}
                            as={passwordView ? IoMdEye : IoMdEyeOff}
                            sx={{ _hover: { cursor: "pointer" } }}
                          />
                        </InputRightAddon>
                      </InputGroup>
                      <FormHelperText>{formik.errors.password}</FormHelperText>
                    </FormControl>
                    <Stack spacing={10}>
                          <Link onClick={() => router.push("/forgotpassword")} color="facebook">
                            Forgot your password?
                          </Link>
                      <Button
                        onClick={formik.handleSubmit}
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        disabled={formik.values.usermail && formik.values.password ? false : true}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
                      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                      <Text>Don't have an account yet?<Link onClick={() => router.push("/register")} colorScheme="facebook"> Register now!</Link>
                      </Text>
                      </Box>
              </Stack>
            {/* </Flex> */}
            </HStack>
        </>
      );
    }
    