import React, { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "reactstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaste } from "../Redux/actions/fetchpaste";
import { fetchSinglePaste } from "../Redux/actions/fetchpaste";
import { deletePaste } from "../Redux/actions/deletepaste";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Header from "./Header";
import Mymodal from "./Mymodal";
import SweetAlert from "react-bootstrap-sweetalert";

const Dashboard = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  const dispatch = useDispatch();

  const { loading, paste } = useSelector((state) => ({
    loading: state.fetchPasteReducer.loading,
    paste: state.fetchPasteReducer.paste,
  }));

  useEffect(() => {
    dispatch(fetchPaste());
  }, [dispatch]);

  const removehandle = (id) => {
    dispatch(deletePaste(id));
  };

  return (
    <div className="dashboard-container">
      <Header></Header>
      <Container className="pt-5">
        <Row className="p-3 ">
          <Button
            color="primary"
            onClick={() => {
              toggle();
              setAction("create");
            }}
          >
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
                              toggle();
                              setAction("edit");
                              dispatch(fetchSinglePaste(paste.id));
                            }}
                            className="icon"
                          />

                          <FaTrashAlt
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure to delete this record?"
                                )
                              ) {
                                removehandle(paste.id);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
              </>
            )}
          </tbody>
        </Table>
        {modal && (
          <Mymodal
            modal={modal}
            action={action}
            setModal={setModal}
            toggle={toggle}
          />
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
