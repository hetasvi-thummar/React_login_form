import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  Row,
  Form,
  Container,
  Col,
  FormGroup,
} from "reactstrap";
import * as yup from "yup";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import { AddPaste, FetchPaste } from "../Redux/actions/login";

const FormSchema = yup.object().shape({
  content: yup.string().required("*Text is Required"),
  Expiration: yup.string().required("*Please select any value"),
  Exposure: yup.string().required("*Please select any value"),
  title: yup.string().required("*Text is Required"),
});

const Dashboard = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  const { loading, paste } = useSelector((state) => ({
    loading: state.LoginReducer.fetchpaste.loading,
    paste: state.LoginReducer.fetchpaste.paste,
  }));

  const { control, register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(FormSchema),
  });
  const onSubmit = (data) => {
    // console.log(allpastes);
    dispatch(
      AddPaste(data.content, data.Expiration, data.Exposure, data.title)
    );
    toggle();
  };

  useEffect(() => {
    dispatch(FetchPaste());
  }, [dispatch]);

  return (
    <Container fluid={true}>
      <Row className="p-3">
        <Button color="primary" onClick={toggle}>
          Add Paste
        </Button>
      </Row>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Added</th>
            <th>Expiry Time</th>
          </tr>
        </thead>
        <tbody>
          {paste !== null &&
            paste.reverse().map((paste) => (
              <tr key={paste.id}>
                <td>{paste.title}</td>
                <td>{moment(paste.created_at).format("MMM Do, YY")}</td>
                <td>{paste.Expiration}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>
            <Row>
              <Col md={12}>
                <Label>Create New Paste</Label>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-1">
              <Row>
                <Col md={12}>
                  <Label>New Paste</Label>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="textarea"
                      name="content"
                      defaultValue=""
                      control={control}
                      ref={register}
                    />
                    {errors && errors.content && (
                      <span className="text-danger">
                        {errors.content.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label>Paste Expiration</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="select"
                      name="Expiration"
                      defaultValue=""
                      control={control}
                      ref={register}
                    >
                      <option>Select</option>
                      <option>aminute</option>
                      <option>ahours</option>
                    </Controller>
                    {errors && errors.Expiration && (
                      <span className="text-danger">
                        {errors.Expiration.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label>Paste Exposure</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="select"
                      name="Exposure"
                      defaultValue=""
                      control={control}
                      ref={register}
                    >
                      <option>Select</option>
                      <option>public</option>
                      <option>private</option>
                      <option>unlisted</option>
                    </Controller>
                    {errors && errors.Exposure && (
                      <span className="text-danger">
                        {errors.Exposure.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label> Paste Name/Title</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="title"
                      defaultValue=""
                      control={control}
                      ref={register}
                    />
                    {errors && errors.title && (
                      <span className="text-danger">
                        {errors.title.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <ModalFooter>
                <Button color="primary">Save</Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </>
    </Container>
  );
};

export default Dashboard;
