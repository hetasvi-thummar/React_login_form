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
import { fetchSinglePaste } from "../Redux/actions/fetchpaste";
import { deletePaste } from "../Redux/actions/deletepaste";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Header from "./Header";
import { editPaste } from "../Redux/actions/editpaste";

const formSchema = yup.object().shape({
  content: yup.string().required("*Content is Required"),
  Expiration: yup.string().required("*Please select any value"),
  Exposure: yup.string().required("*Please select any value"),
  title: yup.string().required("*Title is Required"),
});

const Dashboard = () => {
  const [newModal, setNewModal] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const popup = () => setNewModal(!newModal);

  const dispatch = useDispatch();

  const { loading, paste, onepaste } = useSelector((state) => ({
    loading: state.fetchPasteReducer.loading,
    paste: state.fetchPasteReducer.paste,
    onepaste: state.fetchPasteReducer.singlePaste.onepaste,
  }));

  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    dispatch(fetchPaste());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(
      addPaste(
        data.content,
        data.Expiration,
        data.Exposure,
        data.title,
        setModal
      )
    );
  };

  const removehandle = (id) => {
    dispatch(deletePaste(id));
  };

  const edithandle = (data) => {
    dispatch(
      editPaste(
        data.content,
        data.Expiration,
        data.Exposure,
        data.title,
        onepaste.id,
        setNewModal
      )
    );
  };

  return (
    <div className="dashboard-container">
      <Header></Header>
      <Container className="pt-5">
        <Row className="p-3 ">
          <Button color="primary" onClick={toggle}>
            Add Paste
          </Button>
        </Row>
        <Table className="dashboard-table">
          <thead className="bg-light">
            <tr>
              <th>Content</th>
              <th>Name</th>
              <th>Added</th>
              <th>Exposure</th>
              <th>Expiry Time</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {paste !== null &&
                  paste
                    .slice(0)
                    .sort(
                      (item, index) =>
                        new Date(index.created_at) - new Date(item.created_at)
                    )
                    .map((paste) => (
                      <tr key={paste.id}>
                        <td>{paste.content}</td>
                        <td>{paste.title}</td>
                        <td>{moment(paste.created_at).format("MMM Do, YY")}</td>
                        <td>{paste.Exposure}</td>
                        <td>{paste.Expiration}</td>
                        <td>
                          <FaPencilAlt
                            onClick={() => {
                              popup();
                              dispatch(fetchSinglePaste(paste.id));
                            }}
                            className="icon"
                          />
                          <FaTrashAlt onClick={() => removehandle(paste.id)} />
                        </td>
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

        <Modal isOpen={newModal} toggle={popup}>
          {onepaste !== null && (
            <>
              <Form onSubmit={handleSubmit(edithandle)}>
                <ModalHeader toggle={popup}>Edit Paste</ModalHeader>

                <ModalBody>
                  <Row>
                    <Col md={12}>
                      <Label> Paste</Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Controller
                          as={Input}
                          type="textarea"
                          name="content"
                          defaultValue={onepaste.content}
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
                          defaultValue={onepaste.Expiration}
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
                          defaultValue={onepaste.Exposure}
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
                          defaultValue={onepaste.title}
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
            </>
          )}
        </Modal>
      </Container>
    </div>
  );
};

export default Dashboard;
