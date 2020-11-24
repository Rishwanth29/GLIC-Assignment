import React, { useState, useRef } from "react";
import "../App.css";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
} from "@material-ui/core";
import {
  Modal,
  ModalBody,
  Container,
  Input,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

function Todolist() {
  const [itemname, setItemname] = useState("");
  const [itemlist, setItemsinlist] = useState([]);
  const [itemselectedforedit, setItemselectedforedit] = useState("");
  const [itemindexelectedforedit, setItenindexselectedforindex] = useState("");
  const [updatemodal, setUpdatemodal] = React.useState(false);
  const [deletemodal, setDeletemodal] = React.useState(false);
  const textInput = useRef(null);

  // Add the Item to the list
  const addtolist = () => {
    if (!itemname) {
      ToastsStore.warning("To Do list item cannot be empty!");
    } else {
      setItemsinlist([...itemlist, itemname]);
      ToastsStore.success("Item Successfully Added!");
      setItemname("");
      textInput.current.value = "";
    }
  };

  // Delete an list item
  const deleteitem = () => {
    setItemsinlist(
      itemlist
        .slice(0, itemindexelectedforedit)
        .concat(itemlist.slice(itemindexelectedforedit + 1, itemlist.length))
    );
    ToastsStore.warning("Item Successfully Deleted!");
    setDeletemodal(false);
  };

  // Selected item for edit
  const selectedItem = (items, index, type) => {
    setItemselectedforedit(items);
    setItenindexselectedforindex(index);
    if (type === "Edit") {
      setUpdatemodal(true);
    } else {
      setDeletemodal(true);
    }
  };

  // Edit an item
  const editlistitem = () => {
    if (!itemselectedforedit) {
      ToastsStore.warning("Item cannot be empty!");
    } else {
      const itemlistupdated = [...itemlist];
      itemlistupdated[itemindexelectedforedit] = itemselectedforedit;
      setItemsinlist(itemlistupdated);
      ToastsStore.success("Item Successfully Edited!");
      setUpdatemodal(false);
    }
  };

  return (
    <>
      {/* Toaster fir notifications */}
      <ToastsContainer
        className="toastcustom"
        position={ToastsContainerPosition.TOP_RIGHT}
        store={ToastsStore}
        lightBackground
      />
      <br />
      <h3>To Do List</h3>

      {/* Create Item */}
      <Col md="6" xl="6">
        <Card className="cardstyle">
          <CardHeader>Add your To Do</CardHeader>
          <CardBody>
            <form
              id="additemfield"
              onSubmit={(e) => {
                e.preventDefault();
                addtolist();
              }}
            >
              <List>
                <ListItem button>
                  {" "}
                  <TextField
                    id="standard-full-width"
                    inputRef={textInput}
                    style={{ margin: 8 }}
                    placeholder="Add your Item"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setItemname(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Tooltip title="Add item">
                    <ListItemIcon>
                      <AddCircleOutlineOutlinedIcon
                        className="correcticon"
                        onClick={(e) => {
                          e.preventDefault();
                          addtolist();
                        }}
                      />
                    </ListItemIcon>
                  </Tooltip>
                </ListItem>
              </List>
            </form>
          </CardBody>
        </Card>
      </Col>
      <br />

      {/* Modal for update */}
      <Container>
        <Modal isOpen={updatemodal} toggle={() => setUpdatemodal(false)}>
          <div className="modal-header justify-content-center">
            <div className="justify-content-left">
              <h4 className="title title-up">Update List Item</h4>
            </div>
            <Tooltip title="Close">
              <button className="close">
                <HighlightOffIcon onClick={() => setUpdatemodal(false)} />
              </button>
            </Tooltip>
          </div>
          <ModalBody>
            <Row>
              <Col md="10" xl="10">
                <Input
                  placeholder={itemselectedforedit}
                  type="text"
                  value={itemselectedforedit}
                  onChange={(e) => setItemselectedforedit(e.target.value)}
                />
              </Col>
              <Col md="2" xl="2">
                <Tooltip title="Update Item">
                  <CheckCircleOutlineIcon
                    className="correcticon"
                    onClick={() => editlistitem()}
                  />
                </Tooltip>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={deletemodal} toggle={() => setDeletemodal(false)}>
          <div className="modal-header justify-content-center">
            <div className="justify-content-left">
              <h5 className="title title-up">Remove To Do?</h5>
            </div>
            <Tooltip title="Close">
              <button className="close">
                <HighlightOffIcon onClick={() => setDeletemodal(false)} />
              </button>
            </Tooltip>
          </div>
          <ModalBody>
            <Row>
              <Col md="10" xl="10">
                Are you sure you want to remove your To Do: <br />
                <b>{itemselectedforedit}</b>?
              </Col>
              <Col md="2" xl="2">
                <Tooltip title="Delete Item">
                  <DeleteOutlinedIcon
                    className="deleteicon"
                    onClick={() => deleteitem()}
                  />
                </Tooltip>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>

      {/* Display the list items */}
      <Col md="6" xl="6">
        <Card className="cardstyle">
          <CardHeader>Your To Do list</CardHeader>
          <CardBody>
            {" "}
            <List>
              <ol>
                {itemlist.map((items, index) => (
                  <li key={index}>
                    <>
                      <ListItem button>
                        <ListItemText primary={items} />
                        <Tooltip title="Edit Item">
                          <ListItemIcon>
                            <EditIcon
                              onClick={() => selectedItem(items, index, "Edit")}
                            />
                          </ListItemIcon>
                        </Tooltip>
                        <Tooltip title="Delete Item">
                          <ListItemIcon>
                            <DeleteOutlinedIcon
                              className="deleteicon"
                              onClick={() =>
                                selectedItem(items, index, "Delete")
                              }
                            />
                          </ListItemIcon>
                        </Tooltip>
                      </ListItem>
                    </>
                  </li>
                ))}
              </ol>
            </List>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Todolist;
