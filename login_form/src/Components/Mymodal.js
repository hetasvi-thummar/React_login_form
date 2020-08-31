import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import { addPaste } from "../Redux/actions/addpaste";
import { editPaste } from "../Redux/actions/editpaste";
import * as yup from "yup";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  Row,
  Form,
  Col,
  FormGroup,
} from "reactstrap";

const formSchema = yup.object().shape({
  content: yup.string().required("*Content is Required"),
  Expiration: yup.string().required("*Please select any value"),
  Exposure: yup.string().required("*Please select any value"),
  title: yup.string().required("*Title is Required"),
});

const Mymodal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const { loading, onepaste } = useSelector((state) => ({
    loading: state.fetchPasteReducer.singlePaste.loading,
    onepaste: state.fetchPasteReducer.singlePaste.onepaste,
  }));

  const onSubmit = (data) => {
    action === "create"
      ? dispatch(
          addPaste(
            data.content,
            data.Expiration,
            data.Exposure,
            data.title,
            setModal
          )
        )
      : dispatch(
          editPaste(
            data.content,
            data.Expiration,
            data.Exposure,
            data.title,
            onepaste.id,

            setModal
          )
        );
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {action === "create" ? "New Paste" : "Edit Paste"}
        </ModalHeader>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                      defaultValue={
                        action === "create"
                          ? ""
                          : onepaste !== null && onepaste.content
                      }
                      control={control}
                      ref={register}
                      placeholder="Enter your paste"
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
                      defaultValue={
                        action === "create"
                          ? ""
                          : onepaste !== null && onepaste.Expiration
                      }
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
                      defaultValue={
                        action === "create"
                          ? ""
                          : onepaste !== null && onepaste.Exposure
                      }
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
                      defaultValue={
                        action === "create"
                          ? ""
                          : onepaste !== null && onepaste.title
                      }
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
              <Button color="primary">
                {action === "create" ? "Save" : "Update Paste"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Mymodal;
