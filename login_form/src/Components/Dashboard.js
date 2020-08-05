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
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import { addPaste } from "../Redux/actions/addpaste";
import { fetchPaste } from "../Redux/actions/fetchpaste";
import Header from "./Header";

const formSchema = yup.object().shape({
  content: yup.string().required("*Text is Required"),
  Expiration: yup.string().required("*Please select any value"),
  Exposure: yup.string().required("*Please select any value"),
  title: yup.string().required("*Text is Required"),
});

const Dashboard = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  const [refreshData, setRefreshData] = useState(false);

  const { loading, paste } = useSelector((state) => ({
    loading: state.fetchPasteReducer.loading,
    paste: state.fetchPasteReducer.paste,
  }));

  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = (data) => {
    setRefreshData(false);
    dispatch(
      addPaste(data.content, data.Expiration, data.Exposure, data.title)
    );

    setRefreshData(true);
    toggle();
  };

  useEffect(() => {
    dispatch(fetchPaste());
  }, [dispatch, refreshData]);

  return (
    <div className="dashboard-container">
      <Header></Header>
      <Container className="pt-5">
        <Row className="p-3 ">
          <Button color="primary" onClick={toggle}>
            Add Paste
          </Button>
        </Row>
        <Table>
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Added</th>
              <th>Expiry Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {paste !== null &&
                  paste
                    .slice()
                    .reverse()
                    .map((paste) => (
                      <tr key={paste.id}>
                        <td>{paste.title}</td>
                        <td>{moment(paste.created_at).format("MMM Do, YY")}</td>
                        <td>{paste.Expiration}</td>
                      </tr>
                    ))}
              </>
            )}
          </tbody>
        </Table>

        <Modal isOpen={modal} toggle={toggle}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={toggle}>Create New Paste</ModalHeader>
            <ModalBody>
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
                      control={control}
                      ref={register}
                    >
                      <option value="">Select</option>
                      <option value="aminute">aminute</option>
                      <option value="ahours">ahours</option>
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
                      control={control}
                      ref={register}
                    >
                      <option value="">Select</option>
                      <option value="public">public</option>
                      <option value="private">private</option>
                      <option value="unlisted">unlisted</option>
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
                      placeholder="Enter Paste Title"
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
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Save</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default Dashboard;
