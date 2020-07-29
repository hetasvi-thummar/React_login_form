import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import "../App.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useHistory } from "react-router-dom";
import { LoginData } from "../Redux/actions/login";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

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
    dispatch(LoginData(data.identifier, data.password, history));
    reset({ identifier: "", password: "" });
  };

  return (
    <div className="maindiv">
      <Container>
        <Form onSubmit={handleSubmit(onsubmit)} className="loginbox">
          <div className="text-center pb-5">
            <h2>Welcome !!!!!</h2>
          </div>
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
