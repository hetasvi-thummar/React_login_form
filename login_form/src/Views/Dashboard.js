import React, { useState } from "react";
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
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";

const Dashboard = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // const notify = () => {
  //   toast("sucessfully added !");
  // };

  const { control, register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="p-5">
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
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>

      <>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-1">
              <Label>New Paste</Label>
              <Controller
                as={Input}
                type="textarea"
                name="newpaste"
                control={control}
                ref={register}
              />
              <Label>Optional Paste Settings</Label>
              <br></br>
              <Label>Paste Expiration</Label>
              <Controller
                as={Input}
                type="select"
                name="expiration"
                control={control}
                ref={register}
              >
                <option>Never</option>
                <option>10 minutes</option>
                <option>1 Hour</option>
                <option>1 Day</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
                <option>6 Months</option>
                <option>1 Year</option>
                />
              </Controller>
              <Label>Paste Exposure</Label>
              <Controller
                as={Input}
                type="select"
                name="exposure"
                control={control}
                ref={register}
              >
                <option>Public</option>
                <option>Private</option>
                />
              </Controller>
              <Label> Paste Name/Title</Label>
              <Controller
                as={Input}
                type="text"
                name="title"
                control={control}
                ref={register}
              />
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    // notify();
                    // toggle();
                  }}
                >
                  Create New Paste
                </Button>
                <ToastContainer position={"top-center"} />
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </>
    </Container>
  );
};

export default Dashboard;
