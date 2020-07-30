import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import "../App.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useHistory, Redirect } from "react-router-dom";
import { loginData } from "../Redux/actions/login";
import { useDispatch } from "react-redux";
import logo from "./Images/formlogo.png";

const FormSchema = yup.object().shape({
  identifier: yup.string().required("*username is Required"),
  password: yup.string().required("*Password is Required"),
});

const Loginform = () => {
  const { control, register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(FormSchema),
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const onsubmit = (data) => {
    dispatch(loginData(data.identifier, data.password, history));
    reset({ identifier: "", password: "" });
  };
  const token = localStorage.getItem("jwt");

  return token ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="maindiv">
      <Container>
        <Form onSubmit={handleSubmit(onsubmit)} className="loginbox">
          <FormGroup className="text-center">
            <img src={logo} alt="logo" className="logo1" />
          </FormGroup>

          <FormGroup>
            <Controller
              as={Input}
              type="text"
              name="identifier"
              defaultValue=""
              placeholder="username"
              control={control}
              ref={register}
              className="text-center"
            />
            {errors && errors.identifier && (
              <span className="text-danger">{errors.identifier.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Controller
              as={Input}
              type="password"
              name="password"
              defaultValue=""
              placeholder="password"
              control={control}
              ref={register}
              className="text-center"
            />
            {errors && errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary">Sign In</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};
export default Loginform;
