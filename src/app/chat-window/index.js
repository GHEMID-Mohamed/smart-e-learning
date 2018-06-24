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
import { map, filter, find, forEach } from "lodash";
import { paperPlane } from "react-icons-kit/fa/paperPlane";
import { lightbulbO } from "react-icons-kit/fa/lightbulbO";
import { checkCircle } from "react-icons-kit/fa/checkCircle";
import { checkCircleO } from "react-icons-kit/fa/checkCircleO";
import { envelopeSquare } from "react-icons-kit/fa/envelopeSquare";
import { comment } from "react-icons-kit/fa/comment";
import { close } from "react-icons-kit/fa/close";
import { graduationCap } from "react-icons-kit/fa/graduationCap";
import { male } from "react-icons-kit/fa/male";
import {
  Alert,
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
import { userO } from "react-icons-kit/fa/userO";
import ScrollArea from "react-scrollbar";
import { ban } from "react-icons-kit/fa/ban";
import "../style/hover.css";
import classnames from "classnames";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import AlarmImg from "../imgs/alarm.gif";
import CommentsImg from "../imgs/comments.png";
import AddComment from "../imgs/addComment.png";

const readyQuestions = [
  "J'ai pas compris la dernière phase du cycle en V",
  "Quelle est la différence entre le cycle en spirale et le cycle en cascade ?",
  "Comment peut on choisir le cycle de vie de logiciel qui convient au projet auquel nous travaillons ?",
  "Pourquoi les cycle en agile ne colle pas avec les logiciels critiques ?",
  "Peut on adopter le cycle en spirale à un projet de développement d'un site web ? ",
  "Pourquoi les entreprises travaillent majoritairement avec le cycle en V ?",
  "Quelles sont les inconvénients des méthodes agiles ?",
  "&kljdfjàçsdfklj ?"
];

const getTheMostRatedQuestion = questions =>
  find(questions, question => question[1] >= 10);

const withState = provideState({
  initialState: () => ({
    preQuestions: [],
    questionsLikes: new Map(),
    question: "",
    messageModal: false,
    commentModal: false,
    activeTab: "1",
    remainingQuestion: 5,
    dropdownOpen: false
  }),
  effects: {
    initialize: effects => {
      forEach(["1", "2", "3", "4"], (value, index) => {
        setTimeout(() => {
          effects.setQuestion(readyQuestions.pop());
          effects.addPreQuestion();
        }, (index + 1) * 7000);
      });
    },
    setQuestion: (_, question) => state => ({
      ...state,
      question
    }),
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
        question: "",
        remainingQuestion: state.remainingQuestion - 1
      };
    },
    handleLike: (_, question) => state => ({
      ...state,
      questionsLikes: state.questionsLikes.set(
        question,
        state.questionsLikes.get(question) + 1
      )
    }),
    genereateQuestion: () => state => ({
      ...state,
      question: readyQuestions.pop()
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
    togglecomment: () => state => ({
      ...state,
      commentModal: !state.commentModal
    }),
    toggle: (_, tab) => state => ({
      ...state,
      activeTab: tab
    }),
    toggleDropDown: () => state => ({
      ...state,
      dropdownOpen: !state.dropdownOpen
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
          <span className="text-muted">Cours</span> Cycle de vie d'un logiciel
          <span className="float-right">
            <Badge color="info">CHAPTER 1</Badge>
          </span>
        </h2>
      </Col>
    </Row>
    <Nav tabs>
      <NavItem
        style={{
          cursor: "pointer",
          width: "33%",
          background: state.activeTab === "1" ? "#49a2b8" : "white",
          color: state.activeTab === "1" ? "white" : "black"
        }}
      >
        <NavLink
          className={classnames({ active: state.activeTab === "1" })}
          onClick={() => {
            effects.toggle("1");
          }}
          className="text-center"
        >
          <Icon icon={graduationCap} /> &nbsp;Student
        </NavLink>
      </NavItem>
      <NavItem
        style={{
          cursor: "pointer",
          width: "33%",
          background: state.activeTab === "2" ? "#49a2b8" : "white",
          color: state.activeTab === "2" ? "white" : "black"
        }}
      >
        <NavLink
          className={classnames({ active: state.activeTab === "2" })}
          onClick={() => {
            effects.toggle("2");
          }}
          className="text-center"
        >
          <Icon icon={userO} /> &nbsp;Controller
        </NavLink>
      </NavItem>
      <NavItem
        style={{
          cursor: "pointer",
          width: "33%",
          background: state.activeTab === "3" ? "#49a2b8" : "white",
          color: state.activeTab === "3" ? "white" : "black"
        }}
      >
        <NavLink
          className={classnames({ active: state.activeTab === "3" })}
          onClick={() => {
            effects.toggle("3");
          }}
          className="text-center"
        >
          <Icon icon={male} />&nbsp;Teacher
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={state.activeTab}>
      <TabPane tabId="1">
        <div>
          <Row>
            <Col>
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
                              onClick={effects.togglecomment}
                            />
                          </span>
                        </ListGroupItem>
                      )
                    )}
                  </ListGroup>
                </CardText>
              </Card>
            </Col>
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
                  <span className="float-right">
                    Remaining questions{" "}
                    <Badge color="danger">{state.remainingQuestion}</Badge>
                  </span>
                  <span
                    className="float-left"
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={effects.genereateQuestion}
                  >
                    Generate question
                  </span>
                  <br />
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal isOpen={state.messageModal} toggle={effects.toggleMessage}>
            <ModalHeader>Send a private response</ModalHeader>
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
          <Modal isOpen={state.commentModal} toggle={effects.togglecomment} size="lg">
            <ModalHeader>Comments</ModalHeader>
            <ModalBody>
              <div>
                <img src={CommentsImg} alt="comments" />
                <img src={AddComment} alt="comments" className="float-right"/>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </TabPane>
      <TabPane tabId="2">
        <Row>
          <Col>
            <br />
            <h4>Waiting for approvment questions</h4>
            <hr />
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
            <br />
            <Dropdown
              isOpen={state.dropdownOpen}
              toggle={effects.toggleDropDown}
              className="float-right"
            >
              <DropdownToggle caret>Chapter 1</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Chapter 2</DropdownItem>
                <DropdownItem>Chapter 3</DropdownItem>
                <DropdownItem>Chapter 4</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <br />
            <br />
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
                        {question[0]}{" "}
                        <Badge color="success" className="float-right">
                          {question[1]}
                        </Badge>
                      </ListGroupItem>
                    )
                  ).slice(0, 3)}
                </ListGroup>
              </CardText>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            {getTheMostRatedQuestion(
              Object.entries(state.sortedQuestions.toJS())
            ) && (
              <div className="text-center">
                <img src={AlarmImg} alt="img" />
                <Alert color="warning">
                  <h2>
                    {
                      getTheMostRatedQuestion(
                        Object.entries(state.sortedQuestions.toJS())
                      )[0]
                    }
                  </h2>
                </Alert>
              </div>
            )}
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  </div>
);

export default withState(injectState(App));
