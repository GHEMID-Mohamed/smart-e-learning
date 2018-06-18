import React, { Fragment } from "react";
import { Icon } from "react-icons-kit";
import { provideState, injectState } from "freactal";
import { thumbsUp } from "react-icons-kit/fa/thumbsUp";
import {
  Input,
  Badge,
  ListGroup,
  ListGroupItem,
  Form,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Map, remove } from "immutable";
import { map, filter } from "lodash";
import { paperPlane } from "react-icons-kit/fa/paperPlane";
import { lightbulbO } from "react-icons-kit/fa/lightbulbO";
import { checkCircle } from "react-icons-kit/fa/checkCircle";
import { checkCircleO } from "react-icons-kit/fa/checkCircleO";
import { envelopeSquare } from "react-icons-kit/fa/envelopeSquare";
import { comment } from "react-icons-kit/fa/comment";
import { close } from "react-icons-kit/fa/close";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import ScrollArea from "react-scrollbar";
import { ban } from "react-icons-kit/fa/ban";
import "../style/hover.css";
import classnames from "classnames";

const withState = provideState({
  initialState: () => ({
    preQuestions: [],
    questionsLikes: new Map(),
    question: "",
    messageModal: false,
    activeTab: "1"
  }),
  effects: {
    handleQuestionChange: (_, { target: { value } }) => state => ({
      ...state,
      question: value
    }),
    addQuestion: (_, question) => state => {
      return {
        ...state,
        preQuestions: state.preQuestions.filter(quest => quest !== question),
        questionsLikes: state.questionsLikes.set(question, 0)
      };
    },
    addPreQuestion: (_, event) => state => {
      if (state.preQuestions.includes(state.question)) {
        return { ...state };
      }
      return {
        ...state,
        preQuestions:
          state.question !== ""
            ? [...state.preQuestions, state.question]
            : state.preQuestions,
        question: ""
      };
    },
    handleLike: (_, question) => state => ({
      ...state,
      questionsLikes: state.questionsLikes.set(
        question,
        state.questionsLikes.get(question) + 1
      )
    }),
    removePreQuestion: (_, question) => state => ({
      ...state,
      preQuestions: filter(state.preQuestions, quest => quest !== question)
    }),
    removeQuestion: (_, question) => state => {
      return {
        ...state,
        questionsLikes: state.questionsLikes.deleteIn(question)
      };
    },
    toggleMessage: () => state => ({
      ...state,
      messageModal: !state.messageModal
    }),
    toggle: (_, tab) => state => ({
      ...state,
      activeTab: tab
    })
  },
  computed: {
    sortedQuestions: ({ questionsLikes }) =>
      questionsLikes.sort((a, b) => {
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
        if (a === b) {
          return 0;
        }
      })
  }
});

const App = ({ state, effects }) => (
  <div>
    <Row>
      <Col>
        <h2>
          <span className="text-muted">Cours:</span> Cycle de vie d'un logiciel
        </h2>
      </Col>
    </Row>
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: state.activeTab === "1" })}
          onClick={() => {
            effects.toggle("1");
          }}
        >
          Student
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: state.activeTab === "2" })}
          onClick={() => {
            effects.toggle("2");
          }}
        >
          Controller
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: state.activeTab === "3" })}
          onClick={() => {
            effects.toggle("3");
          }}
        >
          Teacher
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={state.activeTab}>
      <TabPane tabId="1">
        <div>
          <Row>
            <Col md="7">
              <br />
              <Card body>
                <CardTitle>
                  <Icon
                    icon={checkCircleO}
                    size={25}
                    style={{ verticalAlign: "middle" }}
                  />{" "}
                  Validated questions
                </CardTitle>
                <CardText>
                  <ListGroup>
                    {map(
                      state.questionsLikes.toJS(),
                      (likesNumber, question) => (
                        <ListGroupItem
                          className="hvr-bob"
                          key={`${likesNumber}${question}`}
                        >
                          {question}
                          <Icon
                            icon={close}
                            size={18}
                            className="float-right"
                            style={{
                              cursor: "pointer",
                              color: "gray"
                            }}
                            onClick={() => effects.removeQuestion(question)}
                          />

                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => effects.handleLike(question)}
                          >
                            <Badge
                              color="warning"
                              className="float-right"
                              style={{
                                marginRight: "10px"
                              }}
                            >
                              {likesNumber}
                            </Badge>
                            <Badge color="light" className="float-right">
                              <Icon icon={thumbsUp} />
                            </Badge>
                            <Icon
                              icon={envelopeSquare}
                              size={18}
                              className="float-right"
                              style={{
                                cursor: "pointer",
                                color: "green",
                                marginRight: "10px"
                              }}
                              onClick={effects.toggleMessage}
                            />
                            <Icon
                              icon={comment}
                              size={18}
                              className="float-right"
                              style={{
                                cursor: "pointer",
                                color: "green",
                                marginRight: "10px"
                              }}
                              onClick={effects.toggleMessage}
                            />
                          </span>
                        </ListGroupItem>
                      )
                    )}
                  </ListGroup>
                </CardText>
              </Card>
            </Col>
            <Col />
          </Row>
          <Row
            className="fixed-bottom"
            style={{ marginBottom: "40px", marginLeft: "80px" }}
          >
            <Col />
          </Row>
          <Row
            className="fixed-bottom"
            style={{
              marginBottom: "20px",
              marginRight: "80px",
              marginLeft: "80px"
            }}
          >
            <Col>
              <Row>
                <Col>
                  <ListGroup>
                    {map(state.preQuestions, question => (
                      <ListGroupItem className="hvr-bob" key={`${question}`}>
                        {question}
                        <Icon
                          icon={close}
                          size={35}
                          className="float-right"
                          style={{ cursor: "pointer", color: "gray" }}
                          onClick={() => effects.removePreQuestion(question)}
                        />
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form onSubmit={effects.addPreQuestion}>
                    <InputGroup>
                      <Input
                        onChange={effects.handleQuestionChange}
                        value={state.question}
                        placeholder="Ask a good question !"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="info"
                          onClick={effects.addPreQuestion}
                          className="hvr-pulse-grow"
                        >
                          <Icon icon={paperPlane} size={30} />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
                  <br />
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal isOpen={state.messageModal} toggle={effects.toggleMessage}>
            <ModalHeader toggle={this.toggle}>
              Send a private response
            </ModalHeader>
            <ModalBody>
              <Input type="textarea" />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={effects.toggleMessage}>
                Send
              </Button>{" "}
              <Button color="secondary" onClick={effects.toggleMessage}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </TabPane>
      <TabPane tabId="2">
        <Row>
          <Col>
            <ListGroup>
              {map(state.preQuestions, question => (
                <ListGroupItem className="hvr-bob" key={`${question}`}>
                  {question}
                  <Icon
                    icon={close}
                    size={35}
                    className="float-right"
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={() => effects.removePreQuestion(question)}
                  />
                  <Icon
                    icon={ban}
                    size={35}
                    className="float-right"
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={() => effects.removePreQuestion(question)}
                  />
                  <Icon
                    className="float-right"
                    color="green"
                    icon={checkCircle}
                    onClick={() => effects.addQuestion(question)}
                    size={35}
                    style={{ cursor: "pointer", color: "green" }}
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="3">
        <Row>
          <Col>
            <Card body>
              <CardTitle>
                <Icon
                  icon={lightbulbO}
                  size={25}
                  style={{ verticalAlign: "middle" }}
                />{" "}
                Most rated questions
              </CardTitle>
              <CardText>
                <ListGroup>
                  {map(
                    Object.entries(state.sortedQuestions.toJS()),
                    question => (
                      <ListGroupItem className="hvr-bob" key={`${question}`}>
                        {question[0]}
                      </ListGroupItem>
                    )
                  ).slice(0, 3)}
                </ListGroup>
              </CardText>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  </div>
);

export default withState(injectState(App));
